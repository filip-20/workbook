import { AppDispatch, RootState } from "../../../app/store"
import { sheetActions } from "../../sheet/slice/sheetSlice"

import { githubApi as gitDbApi } from '../../../api/githubApi/endpoints/git'
import { githubApi as pullsApi } from "../../../api/githubApi/endpoints/pulls"
import { githubApi as reposApi, PullRequestSimple, ReposCreateOrUpdateFileContentsApiArg } from "../../../api/githubApi/endpoints/repos"

import { ReposListBranchesApiResponse } from "../../../api/githubApi/endpoints/repos"
import githubApiParseLastPage from "../../../api/githubApi/lastPage";
import { githubApiErrorMessage, isFetchBaseQueryError, isGithubErrorResponse } from "../../../api/githubApi/errorMessage";

import { pathURIEncode } from "../../repository/RepoExplorer";
import sha1 from 'sha1';
import { Base64 } from 'js-base64';
import { HistoryRecord, storageActions } from "../sheetStorage"

export interface GithubFileLocation {
  owner: string,
  repo: string,
  path: string,
  ref: string,
}

export interface GhSaveError {
  type: 'background_update' | 'unknown_error' | 'merged_session',
  message: string,
}

export interface GhMergeError {
  type: 'not_mergable' | 'api_call_failed' | 'multiple_pulls' | 'pr_create_failed' | 'branch_delete_failed' | 'unknown',
  message: string,
  call?: string,
  url?: string,
}

export interface GhStorageState {
  mergeState: 'idle' | 'merging' | 'success' | 'error',
  mergeError?: GhMergeError,
  location: GithubFileLocation,
  sha: string,
  sessionBranch?: { name: string, commitSha: string },
  baseBranch: string,
  baseCommitSha: string,
  saveError?: GhSaveError,
}

export const ghStorageSelectors = {
  ghState: (state: RootState) => state.sheetStorage.storageEngine !== undefined ? (state.sheetStorage.storageEngine.type === 'github' ? state.sheetStorage.storageEngine.state as GhStorageState : undefined) : undefined
}

function ghUpdateState(state: GhStorageState) {
  return storageActions.updateState(state);
}

export function ghClearSessionBranch() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const ghState = ghStorageSelectors.ghState(getState());
    if (ghState !== undefined) {
      const newState: GhStorageState = {
        ...ghState,
        sessionBranch: undefined
      }
      dispatch(ghUpdateState(newState));
    }
  }
}

function listAllRepoBranches(owner: string, repo: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const perPage = 100;
    const headers = await reposApi.endpoints.reposListBranchesHeaders.initiate({ owner, repo, perPage })(dispatch, getState, null)
    if (headers.isError) {
      throw Error('unexpected response');
    }
    const lastPage = githubApiParseLastPage(headers.data?.link);
    let branches: ReposListBranchesApiResponse = [];
    for (let page = 1; page <= lastPage; page++) {
      const response = await reposApi.endpoints.reposListBranches.initiate({ owner, repo, perPage, page })(dispatch, getState, null)
      if (response.data !== undefined) {
        branches = branches.concat(response.data)
      } else {
        throw Error('unexpected response');
      }
    }
    return branches;
  }
}

function listAllPulls(owner: string, repo: string, state: "all" | "open" | "closed" | undefined, forceRefetch: boolean) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const perPage = 100;
    let lastPage = 1;
    let result: PullRequestSimple[] = []
    for (let page = 1; page <= lastPage; page++) {
      const r = await pullsApi.endpoints.pullsListWH.initiate({ owner, repo, state, perPage }, {forceRefetch})(dispatch, getState, null);
      if (r.data === undefined) {
        return { error: r.error! }
      }

      if (page === 1) {
        lastPage = githubApiParseLastPage(r.data.headers['link']);
      }

      result = result.concat(r.data.response);
    }
    return { result };
  }
}

export function getSessionBranchName(fileInfo: { owner: string, repo: string, path: string, ref: string }) {
  const { path, ref } = fileInfo;
  const getName = (p: string) => {
    const f = p.split('/').pop()?.split('.');
    let name = f ? (f.length === 1 ? f[0] : f.slice(0, -1).join('.')) : '';
    // make the name comply with branch name specs (https://git-scm.com/docs/git-check-ref-format)
    name = name.replace('..', '');
    name = name.replace('@{', '');
    name = name.replace('~', '');
    name = name.replace('^', '');
    name = name.replace(':', '');
    name = name.replace('?', '');
    name = name.replace('*', '');
    name = name.replace('[', '');
    name = name.replace(' ', '-');
    return name;
  }
  return `${ref}_session_${getName(path)}_${sha1(path)}`;
}

export function isSessionBranchName(name: string) {
  return name.match(/_session_/) !== null && name.match(/_[a-z0-9]+$/) !== null;
}

function loadFile(fileInfo: { owner: string, repo: string, path: string, ref: string }) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    fileInfo.path = pathURIEncode(fileInfo.path);
    const r = await reposApi.endpoints.reposGetContent.initiate(fileInfo, {forceRefetch: true})(dispatch, getState, null)
    if (!r.isSuccess) {
      return { error: r.error ? githubApiErrorMessage(r.error) : 'Chyba pri volaní github API' };
    }
    const { data } = r;
    if (!('content' in data)) {
      return { error: 'Cesta k hárku neodkazuje na súbor' };
    }
    try {
      return { content: Base64.decode(data.content), sha: data.sha };
    } catch (e) {
      return { error: 'Dekódovanie base64 obsahu zlyhalo' };
    }
  }
}

export function openSheet(location: GithubFileLocation) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { owner, repo, ref } = location;
    dispatch(sheetActions.startLoading());
    
    // list all branches
    let branches: ReposListBranchesApiResponse = [];
    try {
      branches = await listAllRepoBranches(owner, repo)(dispatch, getState);
    } catch (e) {
      console.log('branch listing error ', branches)
      dispatch(sheetActions.setErrorMessage({ message: `API volanie zlyhalo, skúste to znovu`, newState: "load_error" }))
      return;
    }

    // find base branch and session branch in branches list
    const expectedSessionBranchName = getSessionBranchName(location);
    const sheetBranch = branches.filter(b => b.name === ref)[0];
    const sessionBranch = branches.filter(b => b.name === expectedSessionBranchName)[0];

    if (sheetBranch === undefined) {
      // given fileInfo that comes from URL is not valid
      // Error 404 may be returned
      dispatch(sheetActions.setErrorMessage({ message: `Hárok sa nenachádza v repozitáry`, newState: "load_error" }))
      return;
    }

    console.log('branches: ', branches)
    console.log('expected session branch', expectedSessionBranchName)
    console.log('session filter: ', branches.filter(b => b.name === expectedSessionBranchName))
    console.log('sheetBranch is ', sheetBranch);
    console.log('session branch is ', sessionBranch);

    const sheetFileLocation = {
      ...location,
      ref: sessionBranch !== undefined ? sessionBranch.name : sheetBranch.name
    }
    const r1 = await loadFile(sheetFileLocation)(dispatch, getState);
    if ('error' in r1) {
      const { error } = r1;
      dispatch(sheetActions.setErrorMessage({ message: error, newState: "load_error" }))
      return;
    }
    const { content, sha } = r1;

    const engineState: GhStorageState = {
      mergeState: 'idle',
      location,
      baseBranch: sheetBranch.name,
      baseCommitSha: sheetBranch.commit.sha,
      sha,
    }

    if (sessionBranch === undefined) {
      // sessionless
    } else {
      // reusing existing session
      console.log('reusing existing session');
      engineState.sessionBranch = {
        name: sessionBranch.name,
        commitSha: sessionBranch.commit.sha
      }
    }

    // init storage engine
    dispatch(storageActions.init({ type: 'github', initialState: engineState }));

    if (engineState.sessionBranch !== undefined) {
      const merged = await isSessionBranchMerged()(dispatch, getState);
      console.log('isSessionBranchMerged: ', merged);
    }
    const sheetId = sha1(JSON.stringify({storageType: 'github', location}))
    // init sheet
    dispatch(sheetActions.initFromJson({ json: content, sheetId }));
  }
}

export function mergeChanges() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const engineState: GhStorageState = getState().sheetStorage.storageEngine!.state;
    const { owner, repo } = engineState.location;
    const sourceBranch = engineState.sessionBranch!;
    const targetBranch = engineState.baseBranch;

    dispatch(ghUpdateState({
      ...engineState,
      mergeState: 'merging'
    }));

    const r1 = await pullsApi.endpoints.pullsList.initiate({ owner, repo, state: 'open', perPage: 100 })(dispatch, getState, null);
    if (!('data' in r1) || r1.data === undefined) {
      // Listing pulls failed
      const mergeError: GhMergeError = {
        type: 'api_call_failed',
        message: r1.error !== undefined ? githubApiErrorMessage(r1.error) : '',
        call: 'pullsList'
      }

      dispatch(ghUpdateState({
        ...engineState,
        mergeState: 'error',
        mergeError
      }))
      return false;
    }

    const pullsList = r1.data;
    console.log('Pulls list: ', pullsList);

    const pr = pullsList.filter(pull => pull.base.ref === targetBranch && pull.head.ref === sourceBranch.name);
    console.log('filtered pr: ', pr);

    if (pr.length > 1) {
      // this should not happen, github wont allow creation of same PR twice
      const mergeError: GhMergeError = {
        type: 'multiple_pulls',
        message: 'Repozitár je v nekonzistentnom stave: existuje viacero otvorených pull requestov z vetvy sedenia do hlavnej vetvy',
      }
      dispatch(ghUpdateState({
        ...engineState,
        mergeState: 'error',
        mergeError
      }))
      return false;
    }

    let pullNumber;
    let pullUrl;
    if (pr.length === 1) {
      console.log('PR already created');
      pullNumber = pr[0].number;
      pullUrl = pr[0].html_url;
    } else {
      const r2 = await pullsApi.endpoints.pullsCreate.initiate({ owner, repo, body: { title: 'Merged session', head: `refs/heads/${sourceBranch.name}`, base: `refs/heads/${targetBranch}` } })(dispatch, getState, null);
      if (!('data' in r2)) {
        // pull request creation failed
        const mergeError: GhMergeError = {
          type: 'api_call_failed',
          message: githubApiErrorMessage(r2.error),
          call: 'pullsCreate'
        }
        dispatch(ghUpdateState({
          ...engineState,
          mergeState: 'error',
          mergeError
        }))
        return false;
      }

      console.log('created PR: ', r2.data);
      pullNumber = r2.data.number
      pullUrl = r2.data.html_url;
    }

    const r3 = await pullsApi.endpoints.pullsMerge.initiate({ owner, repo, pullNumber, body: { merge_method: "squash" } })(dispatch, getState, null);
    if (!('data' in r3)) {
      // merging request failed
      const { error } = r3;
      let mergeError: GhMergeError;
      if (isFetchBaseQueryError(error)
        && typeof error.status === 'number'
        && isGithubErrorResponse(error.data)
        && error.status === 405
        && error.data.message === 'Pull Request is not mergeable'
      ) {
        mergeError = {
          type: 'not_mergable',
          message: githubApiErrorMessage(r3.error),
          url: pullUrl,
        }
      } else {
        mergeError = {
          type: 'api_call_failed',
          message: githubApiErrorMessage(r3.error),
          call: 'pullsMerge'
        }
      }
      dispatch(ghUpdateState({
        ...engineState,
        mergeState: 'error',
        mergeError
      }));
      return false;
    }

    console.log('merge success', r3.data);

    const r4 = await gitDbApi.endpoints.gitDeleteRef.initiate({ owner, repo, ref: `heads/${pathURIEncode(sourceBranch.name)}` })(dispatch, getState, null);
    if (!('data' in r4)) {
      // this error is ignored for now, it will be reported on next commit to this branch
      console.log('Failed to delete old branch');
    }
    console.log('old branch delete success', r4);

    dispatch(storageActions.updateState({
      ...engineState,
      sessionBranch: undefined,
      mergeState: 'success',
      mergeError: undefined,
      baseCommitSha: r3.data.sha,
    }));
    return r3.data;
  }
}

function createSessionBranch() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const engineState: GhStorageState = getState().sheetStorage.storageEngine!.state
    const { location, baseCommitSha } = engineState;
    console.log('createing new session branch')
    const { owner, repo } = location;
    const sessionBranchName = `refs/heads/${getSessionBranchName(location)}`;
    const response = await gitDbApi.endpoints.gitCreateRef.initiate({ owner, repo, body: { ref: sessionBranchName, sha: baseCommitSha } })(dispatch, getState, null);
    if ('data' in response) {
      // success
      return { response: response.data };
    } else {
      // process error
      const { error } = response;
      if (isFetchBaseQueryError(error)
        && typeof error.status === 'number'
        && isGithubErrorResponse(error.data)
        && error.status === 422
        && error.data.message === 'Reference already exists'
      ) {
        // session branch was already created probably by another workbook instance
        // so file was modified
        const saveError: GhSaveError = {
          type: 'background_update',
          message: error.data.message
        }
        return { saveError };
      } else {
        // unknown error 
        const saveError: GhSaveError = {
          type: 'unknown_error',
          message: githubApiErrorMessage(error)
        }
        return { saveError };
      }
    }
  }
}

function isSessionBranchMerged() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const ghState = ghStorageSelectors.ghState(getState());
    console.log('testSessionBranch');
    if (ghState === undefined || ghState.sessionBranch === undefined) {
      throw Error('isSessionBranchMerged called on uninitialized ghStorage');
    }
    const { owner, repo } = ghState.location;
    const { baseBranch, sessionBranch } = ghState;
    const r = await listAllPulls(owner, repo, 'closed', true)(dispatch, getState)
    
    if (r.error !== undefined) {
      return {error: r.error}
    }
    const pulls = r.result;
    console.log(`searching for pull from ${baseBranch} to ${sessionBranch.name} with sha ${sessionBranch.commitSha}`)
    console.log('pulls: ', pulls)
    for (let pull of pulls) {
      if (pull.state === 'closed'
        && pull.base.ref === baseBranch
        && pull.head.ref === sessionBranch.name
        && pull.head.sha === sessionBranch.commitSha
      ) {
        return {result: true};
      }
    }
    return {result: false};

    /*
    const { baseBranch, sessionBranch } = ghState;
    const { owner, repo } = ghState.location;
    const basehead = `${sessionBranch}...${baseBranch}`;
    const r = await reposApi.endpoints.reposCompareCommits.initiate({owner, repo, basehead})(dispatch, getState, null);
    if (r.data !== undefined) {
      if (r.data.total_commits === 0) {
        console.log('Session branch is merged');
      } else {
        console.log('Session branch is NOT merged');
      }
    }*/
  }
}

function commitRecord(record: HistoryRecord) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const engineState: GhStorageState = getState().sheetStorage.storageEngine!.state
    const { owner, repo, path } = engineState.location;
    const { sessionBranch, sha } = engineState;
    const updateArgs: ReposCreateOrUpdateFileContentsApiArg = {
      owner, repo,
      path: pathURIEncode(path),
      body: {
        message: record.message,
        content: Base64.encode(record.content),
        sha,
        branch: sessionBranch!.name,
      }
    }
    const r = await reposApi.endpoints.reposCreateOrUpdateFileContents.initiate(updateArgs)(dispatch, getState, null);
    if ('error' in r) {
      // report save error
      const { error } = r;

      if (isFetchBaseQueryError(error)
        && typeof error.status === 'number'
        && isGithubErrorResponse(error.data)
        && error.status === 409
      ) {
        // file was probably updated by another workbook instance or in github 
        const saveError: GhSaveError = {
          type: 'background_update',
          message: error.data.message
        }
        return { saveError };
      } else {
        // unknown error 
        const saveError: GhSaveError = {
          type: 'unknown_error',
          message: githubApiErrorMessage(error)
        }
        return { saveError };
      }
    }
    return { response: r };
  }
}

export function onResume(state: GhStorageState) {
  state.saveError = undefined;
}

export function processRecord(record: HistoryRecord) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const engineState: GhStorageState = state.sheetStorage.storageEngine!.state;
    if (engineState.sessionBranch === undefined) {
      const r = await createSessionBranch()(dispatch, getState);
      if (r.saveError !== undefined) {
        const newEngineState: GhStorageState = {
          ...engineState,
          saveError: r.saveError
        }
        dispatch(storageActions.processResult({
          id: record.id,
          errorMessage: `Creation of session branch failed: ${r.saveError.message}`,
          newEngineState,
        }));
        return ;
      }

      console.log('created session branch ', r.response);
      const newEngineState: GhStorageState = {
        ...engineState,
        sessionBranch: {
          name: getSessionBranchName(engineState.location),
          commitSha: r.response.object.sha
        }
      }
      dispatch(storageActions.updateState(newEngineState));
    }

    const merged = await isSessionBranchMerged()(dispatch, getState);
    if (merged.error !== undefined) {
      const newEngineState: GhStorageState = {
        ...engineState,
        saveError: {
          type: 'unknown_error',
          message: `API call failed: ${githubApiErrorMessage(merged.error)}`
        }
      }
      dispatch(storageActions.processResult({
        id: record.id,
        errorMessage: `API call failed: ${githubApiErrorMessage(merged.error)}`,
        newEngineState,
      }));
      return ;
    }
    if (merged.result === true) {
      const newEngineState: GhStorageState = {
        ...engineState,
        saveError: {
          type: 'merged_session',
          message: 'Merged session branch must be deleted'
        }
      }
      dispatch(storageActions.processResult({
        id: record.id,
        errorMessage: 'Merged session branch must be deleted',
        newEngineState,
      }));

      return ;
    }
    console.log('isSessionBranchMerged: ', merged);

    const r = await commitRecord(record)(dispatch, getState);
    if (r.saveError !== undefined) {
      const newEngineState: GhStorageState = {
        ...engineState,
        saveError: r.saveError
      }
      dispatch(storageActions.processResult({
        id: record.id,
        errorMessage: `Commit failed: ${r.saveError.message}`,
        newEngineState
      }));
    } else {
      const engineState: GhStorageState = getState().sheetStorage.storageEngine!.state
      const sha = r.response.data.content!.sha!;
      const sessionBranch = {
        ...engineState.sessionBranch!,
        commitSha: r.response.data.commit.sha!
      }
      const newEngineState: GhStorageState = {
        ...engineState,
        sha,
        sessionBranch,
      }
      dispatch(storageActions.processResult({ id: record.id, newEngineState }));
      console.log('Commited record ' + record.id);
    }
  }
}