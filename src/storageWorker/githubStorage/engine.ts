import { StorageEngine } from "../storageEngine";
import { AutoSavePayload, CustomCmdPayload } from "../workerApi";
import { GhStorageState, ghClearSessionBranch, mergeChanges, openSheet, processRecord } from "./githubStorage";
import { storageActions, store } from "./store";
import { GhCustomManualSaveErrInfo, GithubFileLocation } from "./types";

export type GhCustomAutosaveErrInfo = Pick<GhStorageState,
  'location'
  | 'sessionBranch'
  | 'baseBranch'
  | 'saveError'
>

export function initGithubEngine(initPayload: any): StorageEngine {
  const dispatch = store.dispatch;
  const getState = store.getState;

  if (! ('ghToken' in initPayload)) {
    throw new Error('Missing github access token in github engine initialization');
  }
  dispatch(storageActions.setToken(initPayload.ghToken));

  return {
    loadSheet: async (addr: GithubFileLocation) => {
      const res = await openSheet(addr)(dispatch, getState)
      if (res.error !== undefined) {
        return { errMsg: res.error }
      }
      /*
      try {
        return {contentObj: JSON.parse(res.json)}
      } catch (e) {
        const syntaxErr = e as SyntaxError
        return {errMsg: `JSON parse failed: ${syntaxErr.message}`};
      }
      */
      return { json: res.json, sheetId: res.sheetId }
    },
    autoSave: async (record: AutoSavePayload) => {
      await processRecord(record)(dispatch, getState);
      const state = getState()
      if (state.sheetStorage.status === 'task_finished') {
        return true;
      }

      const cutstomErr: GhCustomAutosaveErrInfo = {
        location: state.sheetStorage.storageEngine?.state.location,
        sessionBranch: state.sheetStorage.storageEngine?.state.sessionBranch,
        baseBranch: state.sheetStorage.storageEngine?.state.baseBranch,
        saveError: state.sheetStorage.storageEngine?.state.saveError,
      }

      return {
        errMsg: state.sheetStorage.errorMessage || 'err',
        customErrObj: cutstomErr,
      };
    },
    resume: async () => {
      return true
    },
    manualSave: async () => {
      const result = await mergeChanges()(dispatch, getState)
      if (result === false) {
        const state = getState().sheetStorage.storageEngine?.state
        const {baseBranch, mergeState, mergeError, sessionBranch} = state;
        const cutstomErr: GhCustomManualSaveErrInfo = {
          baseBranch, mergeState, mergeError, sessionBranch,
        }

        return {errMsg: state.mergeError?.message || 'save error', customErrObj: cutstomErr}
      } else {
        return true;
      }
    },
    customCmd: async (cmd: CustomCmdPayload) => {
      if (cmd.type === 'clearSessionBranch') {
        return ghClearSessionBranch()(dispatch, getState)
      } else {
        throw new Error('Unknown custom command')
      }
    }
  }
}