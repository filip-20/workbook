import { StorageEngine } from "../storageEngine";
import { AutosavePayload, TaskResult, Task, Command, CommandResult } from "../workerApi";
import { GhStorageState, ghClearSessionBranch, mergeChanges, openSheet, processRecord } from "./githubStorage";
import { storageActions, store } from "./store";
import { GhCustomManualSaveErrInfo, GithubFileLocation } from "./types";

export type GhCustomAutosaveErrInfo = Pick<GhStorageState,
  'location'
  | 'sessionBranch'
  | 'baseBranch'
  | 'saveError'
>

interface CustomState {
  canMerge: boolean,
  autosaveErr?: GhCustomAutosaveErrInfo,
  mergeErr?: GhCustomManualSaveErrInfo
}

export function initGithubEngine(initPayload: any): StorageEngine {
  const dispatch = store.dispatch;
  const getState = store.getState;

  const custom: CustomState = {
    canMerge: false
  }

  function init(payload: any): CommandResult {
    if (!('ghToken' in payload.custom)) {
      throw new Error('Missing github access token in github engine initialization');
    }
    dispatch(storageActions.setToken(payload.custom.ghToken));
    return {
      result: 'success',
      customState: custom,
    }
  }

  async function load(addr: GithubFileLocation): Promise<CommandResult> {
    const res = await openSheet(addr)(dispatch, getState)
    if (res.error !== undefined) {
      return { result: 'error', errorMessage: res.error }
    }
    custom.canMerge = res.custom.canMerge;
    return { result: 'success', data: {json: res.json, sheetId: res.sheetId}, customState: custom }
  }

  async function autosave(record: AutosavePayload): Promise<TaskResult> {
    await processRecord(record)(dispatch, getState);
    const state = getState()
    if (state.sheetStorage.status === 'task_finished') {
      custom.canMerge = true;
      return { result: 'success', customState: custom }
    }

    custom.autosaveErr = {
      location: state.sheetStorage.storageEngine?.state.location,
      sessionBranch: state.sheetStorage.storageEngine?.state.sessionBranch,
      baseBranch: state.sheetStorage.storageEngine?.state.baseBranch,
      saveError: state.sheetStorage.storageEngine?.state.saveError,
    }

    return {
      result: 'error',
      errorMessage: state.sheetStorage.errorMessage || 'err',
      customState: custom
    };
  }

  async function merge(): Promise<TaskResult> {
    const result = await mergeChanges()(dispatch, getState)
    if (result === false) {
      const state = getState().sheetStorage.storageEngine?.state
      const { baseBranch, mergeState, mergeError, sessionBranch } = state;
      custom.mergeErr = {
        baseBranch, mergeState, mergeError, sessionBranch,
      }
      return { result: 'error', errorMessage: state.mergeError?.message || 'save error', customState: custom }
    } else {
      custom.canMerge = false;
      return { result: 'success', customState: custom }
    }
  }

  function clearSessionBranch(): CommandResult {
    ghClearSessionBranch()(dispatch, getState)
    return { result: 'success' }
  }

  const engine: StorageEngine = {
    runCommand: async (cmd: Command) => {
      switch (cmd.type) {
        case 'init': return init(cmd.payload);
        case 'load': return load(cmd.payload as GithubFileLocation)
        case 'clearSessionBranch': return clearSessionBranch();
        default:
          throw new Error("Unknown command in github engine: " + cmd.type)
      }
    },
    runTask: async (task: Task) => {
      switch (task.type) {
        case 'autosave': return autosave(task.payload as AutosavePayload)
        case 'merge': return merge()
        default:
          throw new Error("Unknown task in github engine: " + task.type)
      }
    },
  }
  return engine;
}
/*
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
  *//*
return { json: res.json, sheetId: res.sheetId, custom: res.custom }
},
autoSave: async (record: AutoSavePayload) => {
await processRecord(record)(dispatch, getState);
const state = getState()
if (state.sheetStorage.status === 'task_finished') {
  return {success: true, custom: {canMerge: true}};
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
  return {success: true, custom: {canMerge: false}};
}
},
customCmd: async (cmd: CustomCmdPayload) => {
if (cmd.type === 'clearSessionBranch') {
  return ghClearSessionBranch()(dispatch, getState)
} else {
  throw new Error('Unknown custom command')
}
}
}*/