//import { AppDispatch, RootState, store } from "../../../app/store"
//import { sheetActions } from "../../sheet/slice/sheetSlice"

import { githubApi as gitDbApi } from './githubApi/endpoints/git'
import { githubApi as pullsApi } from "./githubApi/endpoints/pulls"
import { githubApi as reposApi, PullRequestSimple, ReposCreateOrUpdateFileContentsApiArg } from "./githubApi/endpoints/repos"

import { ReposListBranchesApiResponse } from "./githubApi/endpoints/repos"
import githubApiParseLastPage from "./githubApi/lastPage";
import { githubApiErrorMessage, isFetchBaseQueryError, isGithubErrorResponse } from "./githubApi/errorMessage";

//import { pathURIEncode } from "../../repository/RepoExplorer";
import sha1 from 'sha1';
import { Base64 } from 'js-base64';
//mport { ActionCreators as UndoActionCreators } from 'redux-undo'
//import { waitForStorageIdle } from "../storageUtils"

//import { store, storageActions, StorageDispatch as AppDispatch, StorageState as RootState } from "./store"
//import { UpdateRecord } from "../../sheetStorage"
import { AppDispatch, RootState, storageActions, store } from './store';
import { getSessionBranchName, pathURIEncode } from './utils';
import { GhMergeError, GhSaveError, GithubFileLocation } from './types';
//import { AutosavePayload } from '../workerApi';
interface AutosavePayload {
  message: string,
  contentObj: object
}

type MergeState = 'idle' | 'merge_waiting' | 'merging' | 'success' | 'error'

export interface GhStorageState {
  mergeState: MergeState,
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
    const headers = await reposApi.endpoints.reposListBranchesHeaders.initiate({ owner, repo, perPage }, { forceRefetch: true })(dispatch, getState, null)
    if (headers.isError) {
      throw Error('unexpected response');
    }
    const lastPage = githubApiParseLastPage(headers.data?.link);
    let branches: ReposListBranchesApiResponse = [];
    for (let page = 1; page <= lastPage; page++) {
      const response = await reposApi.endpoints.reposListBranches.initiate({ owner, repo, perPage, page }, { forceRefetch: true })(dispatch, getState, null)
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
      const r = await pullsApi.endpoints.pullsListWH.initiate({ owner, repo, state, perPage }, { forceRefetch })(dispatch, getState, null);
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

function loadFile(fileInfo: { owner: string, repo: string, path: string, ref: string }) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    fileInfo.path = pathURIEncode(fileInfo.path);
    const r = await reposApi.endpoints.reposGetContent.initiate(fileInfo, { forceRefetch: true })(dispatch, getState, null)
    if (!r.isSuccess) {
      return { error: r.error ? githubApiErrorMessage(r.error) : 'GitHub API call error while loading the worksheet' };
    }
    const { data } = r;
    if (!('content' in data)) {
      return { error: 'Worksheet path does not refer to a file.' };
    }
    try {
      return { content: Base64.decode(data.content), sha: data.sha };
    } catch (e) {
      return { error: 'Base64 content decoding failed' };
    }
  }
}

export function openSheet(location: GithubFileLocation) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { owner, repo, ref } = location;

    // TODO MOVE TO sheetStorage
    //dispatch(sheetActions.startLoading());

    // list all branches
    let branches: ReposListBranchesApiResponse = [];
    try {
      branches = await listAllRepoBranches(owner, repo)(dispatch, getState);
    } catch (e) {
      console.log('branch listing error ', branches)
      //dispatch(sheetActions.setErrorMessage({ message: `API call (listAllRepoBranches) failed, try again.`, newState: "load_error" }))
      return { error: `API call (listAllRepoBranches) failed, try again.` };
    }

    // find base branch and session branch in branches list
    const expectedSessionBranchName = getSessionBranchName(location);
    const sheetBranch = branches.filter(b => b.name === ref)[0];
    const sessionBranch = branches.filter(b => b.name === expectedSessionBranchName)[0];

    if (sheetBranch === undefined) {
      // given fileInfo that comes from URL is not valid
      // Error 404 may be returned
      // dispatch(sheetActions.setErrorMessage({ message: `The requested work sheet was not found in the repository. Check the file name, path, and branch.`, newState: "load_error" }))
      return { error: `The requested work sheet was not found in the repository. Check the file name, path, and branch.` };
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
      //dispatch(sheetActions.setErrorMessage({ message: error, newState: "load_error" }))
      return { error: error || 'Failed to load file' };
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
    const sheetId = sha1(JSON.stringify({ storageType: 'github', location }))
    return { json: content, sheetId }
  }
}

export function mergeChanges() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const getEngineState = () => getState().sheetStorage.storageEngine!.state as GhStorageState;
    const { owner, repo, path } = getEngineState().location;
    const filename = path.replace(/^([^/]*\/)*([^/]+)\.workbook$/, '$2');

    if (getEngineState().sessionBranch === undefined) {
      const mergeError: GhMergeError = {
        type: 'no_session_branch',
        message: 'There is no session branch therefore no changes to merge',
      }
      dispatch(ghUpdateState({
        ...getEngineState(),
        mergeState: 'error',
        mergeError
      }))
      return false;
    }

    const sourceBranch = getEngineState().sessionBranch!;
    const targetBranch = getEngineState().baseBranch;

    dispatch(ghUpdateState({
      ...getEngineState(),
      mergeState: 'merge_waiting'
    }));

    dispatch(ghUpdateState({
      ...getEngineState(),
      mergeState: 'merging'
    }));

    const r1 = await pullsApi.endpoints.pullsList.initiate({ owner, repo, state: 'open', perPage: 100 }, { forceRefetch: true })(dispatch, getState, null);
    if (!('data' in r1) || r1.data === undefined) {
      // Listing pulls failed
      const mergeError: GhMergeError = {
        type: 'api_call_failed',
        message: r1.error !== undefined ? githubApiErrorMessage(r1.error) : '',
        call: 'pullsList'
      }

      dispatch(ghUpdateState({
        ...getEngineState(),
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
        message: 'The repository is in an inconsistent state. There are multiple pull requests open from the session branch to the base branch.',
      }
      dispatch(ghUpdateState({
        ...getEngineState(),
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
      const r2 = await pullsApi.endpoints.pullsCreate.initiate({
        owner,
        repo,
        body: {
          title: `${filename}: Worksheet session`,
          head: `refs/heads/${sourceBranch.name}`,
          base: `refs/heads/${targetBranch}`
        }
      })(dispatch, getState, null);
      if (!('data' in r2)) {
        // pull request creation failed
        const mergeError: GhMergeError = {
          type: 'api_call_failed',
          message: githubApiErrorMessage(r2.error),
          call: 'pullsCreate'
        }
        dispatch(ghUpdateState({
          ...getEngineState(),
          mergeState: 'error',
          mergeError
        }))
        return false;
      }

      console.log('created PR: ', r2.data);
      pullNumber = r2.data.number
      pullUrl = r2.data.html_url;
    }

    const r3 = await pullsApi.endpoints.pullsMerge.initiate({
      owner,
      repo,
      pullNumber,
      body: {
        commit_title: `${filename}: Worksheet session ${owner}/${repo}#${pullNumber}`,
        commit_message: `See https://github.com/${owner}/${repo}/pull/${pullNumber}`,
        merge_method: "squash"
      }
    })(dispatch, getState, null);
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
        ...getEngineState(),
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
      ...getEngineState(),
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
      return { error: r.error }
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
        return { result: true };
      }
    }
    return { result: false };
  }
}

function commitRecord(record: AutosavePayload) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const engineState: GhStorageState = getState().sheetStorage.storageEngine!.state
    const { owner, repo, path } = engineState.location;
    const { sessionBranch, sha } = engineState;
    const updateArgs: ReposCreateOrUpdateFileContentsApiArg = {
      owner, repo,
      path: pathURIEncode(path),
      body: {
        message: record.message,
        content: Base64.encode(JSON.stringify(record.contentObj, null, 2)),
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

function waitForMerge() {
  return new Promise<void>((resolve, reject) => {
    const processState = () => {
      const state = (store.getState().sheetStorage.storageEngine!.state as GhStorageState).mergeState
      if (state === 'idle' || state === 'success' || state === 'merge_waiting') {
        resolve()
        return true;
      } else if (state === 'error') {
        reject()
        return true;
      }
      return false;
    }
    if (processState() === false) {
      const unsubscribe = store.subscribe(() => {
        if (processState()) {
          unsubscribe()
        }
      })
    }
  })
}

export function processRecord(record: AutosavePayload) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await waitForMerge();
    } catch (e) { }

    const getEngineState = () => getState().sheetStorage.storageEngine!.state;
    if (getEngineState().sessionBranch === undefined) {
      const r = await createSessionBranch()(dispatch, getState);
      if (r.saveError !== undefined) {
        const newEngineState: GhStorageState = {
          ...getEngineState(),
          saveError: r.saveError
        }
        dispatch(storageActions.processResult({
          //id: record.id,
          errorMessage: `Creation of session branch failed: ${r.saveError.message}`,
          newEngineState,
        }));
        return;
      }

      console.log('created session branch ', r.response);
      const newEngineState: GhStorageState = {
        ...getEngineState(),
        sessionBranch: {
          name: getSessionBranchName(getEngineState().location),
          commitSha: r.response.object.sha
        }
      }
      dispatch(storageActions.updateState(newEngineState));
    }

    const merged = await isSessionBranchMerged()(dispatch, getState);
    if (merged.error !== undefined) {
      const newEngineState: GhStorageState = {
        ...getEngineState(),
        saveError: {
          type: 'unknown_error',
          message: `API call failed: ${githubApiErrorMessage(merged.error)}`
        }
      }
      dispatch(storageActions.processResult({
        //id: record.id,
        errorMessage: `API call failed: ${githubApiErrorMessage(merged.error)}`,
        newEngineState,
      }));
      return;
    }
    if (merged.result === true) {
      const newEngineState: GhStorageState = {
        ...getEngineState(),
        saveError: {
          type: 'merged_session',
          message: 'Merged session branch must be deleted'
        }
      }
      dispatch(storageActions.processResult({
        //id: record.id,
        errorMessage: 'Merged session branch must be deleted',
        newEngineState,
      }));

      return;
    }
    console.log('isSessionBranchMerged: ', merged);

    const r = await commitRecord(record)(dispatch, getState);
    if (r.saveError !== undefined) {
      const newEngineState: GhStorageState = {
        ...getEngineState(),
        saveError: r.saveError
      }
      dispatch(storageActions.processResult({
        //id: record.id,
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
      dispatch(storageActions.processResult({ /*id: record.id,*/ newEngineState }));
      //console.log('Commited record ' + record.id);
    }
  }
}