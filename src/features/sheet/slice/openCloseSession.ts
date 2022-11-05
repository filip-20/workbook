import { AppDispatch, RootState } from "../../../app/store";

import { CommitComparison, githubApi as reposApi, ReposListBranchesApiResponse, ShortBranch } from "../../../api/githubApi/endpoints/repos"
import { githubApi as gitDbApi } from '../../../api/githubApi/endpoints/git'
import { githubApi as pullsApi } from "../../../api/githubApi/endpoints/pulls"
import { Base64 } from 'js-base64';
import { githubApiErrorMessage } from "../../../api/githubApi/errorMessage";
import githubApiParseLastPage from "../../../api/githubApi/lastPage";
import { sheetActions } from "./sheetSlice";
import { pathURIEncode } from "../../repository/RepoExplorer";
import sha1 from 'sha1';

function listAllRepoBranches(owner: string, repo: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const perPage = 100;
    const headers = await reposApi.endpoints.reposListBranchesHeaders.initiate({ owner, repo, perPage })(dispatch, getState, null)
    if (headers.isError) {
      throw Error('unexpected response');
    }
    const lastPage = githubApiParseLastPage(headers.data?.link);
    let branches: ReposListBranchesApiResponse = [];
    for (let i = 0; i < lastPage; i++) {
      const response = await reposApi.endpoints.reposListBranches.initiate({ owner, repo, perPage })(dispatch, getState, null)
      if (response.data !== undefined) {
        branches = branches.concat(response.data)
      } else {
        throw Error('unexpected response');
      }
    }
    return branches;
  }
}

function getSessionBranchName(fileInfo: { owner: string, repo: string, path: string, branch: string }) {
  const { owner, repo, path, branch } = fileInfo;
  const getName = (p: string) => {
    const f = p.split('/').pop()?.split('.');
    let name = f ? (f.length === 1 ? f[0] : f.slice(0,-1).join('.')) : '';
    // make the name comply with branch name specs (https://git-scm.com/docs/git-check-ref-format)
    name = name.replace('..', '');
    name = name.replace('@{', '');
    name = name.replace('~', '');
    name = name.replace('^', '');
    name = name.replace(':', '');
    name = name.replace('?', '');
    name = name.replace('*', '');
    name = name.replace('[', '');
    return name;
  }
  return `${branch}_session_${getName(path)}_${sha1(path)}`;
}

export function isSessionBranchName(name: string) {
  return name.match(/_session_/) !== null && name.match(/_[a-z0-9]+$/) !== null;
}

function createNewSessionBranch(fileInfo: { owner: string, repo: string, path: string, branch: string }, fromCommit: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log('createing new session branch')
    const { owner, repo, path, branch } = fileInfo;
    const sessionBranchName = `refs/heads/${getSessionBranchName(fileInfo)}`;
    const response = await gitDbApi.endpoints.gitCreateRef.initiate({ owner, repo, body: { ref: sessionBranchName, sha: fromCommit } })(dispatch, getState, null);
    if ('data' in response) {
      // success
      return response;
    } else {
      // fail
      return false;
    }
  }
}

function mergeSessionBranch(owner: string, repo: string, sourceBranch: ShortBranch, targetBranch: ShortBranch, comparison: CommitComparison, squash: boolean) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const r1 = await pullsApi.endpoints.pullsList.initiate({owner, repo, state: "open"})(dispatch, getState, null);
    if (!('data' in r1) || r1.data === undefined) {
      // Listing pulls failed
      dispatch(sheetActions.setError({ errorMsg: `API volanie zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
      return false;
    }

    const pullsList = r1.data;
    console.log('Pulls list: ', pullsList);

    const pr = pullsList.filter(pull => pull.base.ref === targetBranch.name && pull.head.ref === sourceBranch.name);
    console.log('filtered pr: ', pr);
    
    if (pr.length > 1) {
      dispatch(sheetActions.setError({ errorMsg: `Repozitár je v nekonzistentnom stave: existuje viacero otvorených pull requestov z vetvy sedenia do hlavnej vetvy`, errorCode: 0, newState: "load_error" }))
      return false;
    }

    let pullNumber;
    if (pr.length === 1) {
      console.log('PR already created');
      pullNumber = pr[0].number;
    } else {
      const r2 = await pullsApi.endpoints.pullsCreate.initiate({owner, repo, body: {title: 'Merged session', head: `refs/heads/${sourceBranch.name}`, base: `refs/heads/${targetBranch.name}`}})(dispatch, getState, null);
      if (!('data' in r2)) {
        // pull request creation failed
        dispatch(sheetActions.setError({ errorMsg: `Vytvorenie PR zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
        return false;
      }

      console.log('created PR: ', r2.data);
      pullNumber = r2.data.number
    }

    const r3 = await pullsApi.endpoints.pullsMerge.initiate({owner, repo, pullNumber, body: {merge_method: "squash"}})(dispatch, getState, null);
    if (!('data' in r3)) {
      // merging request failed
      dispatch(sheetActions.setError({ errorMsg: `Zlúčenie PR zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
      return false;
    }

    console.log('merge success', r3.data);

    const r4 = await gitDbApi.endpoints.gitDeleteRef.initiate({owner, repo, ref: `heads/${sourceBranch.name}`})(dispatch, getState, null);
    if (!('data' in r4)) {
      dispatch(sheetActions.setError({ errorMsg: `Zmazanie starej vetvy zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
      return false;
    }
    console.log('old branch delete success', r4);

    return r3.data;
  }
}

export function openSheet(fileInfo: { owner: string, repo: string, path: string, branch: string }) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { owner, repo, path, branch } = fileInfo;
    dispatch(sheetActions.setOpenedFile(fileInfo))
    dispatch(sheetActions.setState('loading'))

    // list all branches
    let branches: ReposListBranchesApiResponse = [];
    try {
      branches = await listAllRepoBranches(owner, repo)(dispatch, getState);
    } catch (e) {
      console.log('branch listing error ', branches)
      dispatch(sheetActions.setError({ errorMsg: `API volanie zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
      return;
    }

    // find base branch and session branch in branches list
    const expectedSessionBranchName = getSessionBranchName(fileInfo);
    const sheetBranch = branches.filter(b => b.name === branch)[0];
    const sessionBranch = branches.filter(b => b.name === expectedSessionBranchName)[0];

    if (sheetBranch === undefined) {
      // given fileInfo that comes from URL is not valid
      // Error 404 may be returned
      dispatch(sheetActions.setError({ errorMsg: `Hárok sa nenachádza v repozitáry`, errorCode: 0, newState: "load_error" }))
      return ;
    }

    console.log('branches: ', branches)
    console.log('expected session branch', expectedSessionBranchName)
    console.log('session filter: ', branches.filter(b => b.name === expectedSessionBranchName))
    console.log('sheetBranch is ', sheetBranch);
    console.log('session branch is ', sessionBranch);

    if (sessionBranch === undefined) {
      console.log('creating new session branch');
      const newBranch = await createNewSessionBranch(fileInfo, sheetBranch.commit.sha)(dispatch, getState);
      if (newBranch === false) {
        // branch creation failed, 
        // that may be because API request failed or branch already exists (race condition)  
        dispatch(sheetActions.setError({ errorMsg: `API volanie zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
      } else {
        // open created session
        dispatch(openSession(owner, repo, path, expectedSessionBranchName, newBranch.data.object.sha));
      }
    } else {

      console.log('Reusing existing session branch');
      dispatch(openSession(owner, repo, path, sessionBranch.name, sessionBranch.commit.sha));

      /*
      const cmp = await reposApi.endpoints.reposCompareCommits.initiate({owner, repo, basehead: `${sheetBranch.name}...${sessionBranch.name}`})(dispatch, getState, null);
      if (cmp.data === undefined) {
        dispatch(sheetActions.setError({ errorMsg: `API volanie zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
        return ;
      }

      console.log('session branch exists');
      console.log('compare: ', cmp.data);

      if (cmp.data.ahead_by === 0) {
        console.log('reusing session');
        console.log(sessionBranch.commit.sha);
        // session branch exists but there are no new commits
        // dont merge it, just use it
        dispatch(openSession(owner, repo, path, sessionBranch.name, sessionBranch.commit.sha));
      } else {
        // there is session branch with commits
        // merge it and delete it
        console.log('merging session branch');
        const mergeCommit = await mergeSessionBranch(owner, repo, sessionBranch, sheetBranch, cmp.data, false)(dispatch, getState);
        if (mergeCommit !== false) {

          const newBranch = await createNewSessionBranch(fileInfo, mergeCommit.sha)(dispatch, getState);
          if (newBranch === false) {
            // branch creation failed, 
            // that may be because API request failed or branch already exists (race condition)  
            dispatch(sheetActions.setError({ errorMsg: `API volanie zlyhalo, skúste to znovu`, errorCode: 0, newState: "load_error" }))
          } else {
            // open created session
            dispatch(openSession(owner, repo, path, expectedSessionBranchName, newBranch.data.object.sha));
          }

        } else {
          // nothing to do, error was set by mergeSessionBranch call
          return ;
        }
      }*/
    }
  }
}

function openSession(owner: string, repo: string, path: string, branch: string, sha: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log('opening session at branch ', branch, ', commit ', sha);

    const response = await reposApi.endpoints.reposGetContent.initiate({ owner, repo, path: pathURIEncode(path), ref: sha })(dispatch, getState, null)
    if (response.isSuccess) {
      const { data } = response;
      if ('content' in data) {
        try {
          const content = Base64.decode(data.content);
          dispatch(sheetActions.loadSheet({ json: content, fileInfo: { owner, repo, branch, path, sha: data.sha } }))
        } catch (e) {
          dispatch(sheetActions.setError({ errorMsg: `Dekódovanie base64 obsahu zlyhalo`, errorCode: 0, newState: "load_error" }))
        }
      } else {
        dispatch(sheetActions.setError({ errorMsg: 'Cesta k hárku neodkazuje na súbor', errorCode: 0, newState: "load_error" }))
      }
    } else {
      dispatch(sheetActions.setError({ errorMsg: response.error ? githubApiErrorMessage(response.error) : 'Chyba pri volaní github API', errorCode: 0, newState: "load_error"}))
    }
  }
}