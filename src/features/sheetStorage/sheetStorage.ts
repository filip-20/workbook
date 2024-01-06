import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "../../app/store";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
//import { processRecord as ghProcessRecord, mergeChanges as ghSaveChanges, onResume as ghOnResume } from "./github/githubStorage";
import { sheetActions } from "../sheet/slice/sheetSlice";
import { AutoSavePayload, EngineType, ManualSavePayload, swAutoSave, swInit, swLoadSheet, swManualSave } from "../../storageWorker/workerApi";


export type StorageStatus = 'not_initialized' | 'idle' | 'task_finished' | 'processing' | 'paused' | 'error' | 'offline_paused'
export type SaveStatus = 'idle' | 'save_waiting' | 'saving' | 'success' | 'error'

export interface AutoSaveTask {
  type: 'auto_save',
  payload: AutoSavePayload
}
interface ManualSaveTask {
  type: 'manual_save',
  payload: ManualSavePayload
}
type Task = AutoSaveTask | ManualSaveTask


export interface TaskItem {
  id: number,
  synced: boolean,
  timestamp: number,
  task: Task
}

export interface TaskQueue {
  idCounter: number,
  nextIndex: number,
  items: Array<TaskItem>
}


export interface SheetStorage {
  status: StorageStatus,
  saveStatus: SaveStatus,
  instanceId: number,
  queue: TaskQueue,
  online: boolean,
  storage?: {
    type: string,
    autosaveError?: {msg: string, custom: any}, // gh commit
    manualSaveError?: {msg: string, custom: any}, // gh merge
  }
  unsyncedChangesCounter: number,
}

const initialState: SheetStorage = {
  status: 'not_initialized',
  saveStatus: 'idle',
  online: false,
  queue: {
    idCounter: 0,
    nextIndex: 0,
    items: []
  },
  instanceId: -1,
  unsyncedChangesCounter: 0
}

const storageSlice = createSlice({
  name: 'sheetStorage',
  initialState,
  reducers: {
    enqueueTask: (state, action: PayloadAction<Task>) => {
      state.queue.items.push({
        id: state.queue.idCounter++,
        synced: false,
        timestamp: Math.floor(Date.now() / 1000),
        task: action.payload
      })
    },
    processResult: (state, action: PayloadAction<{ id: number, instanceId: number, error?: {msg: string, custom: any} }>) => {
      const { id, instanceId, error } = action.payload;
      if (state.queue.nextIndex >= state.queue.items.length) {
        throw new Error('History queue inconsistent: nextIndex is too big');
      }
      if (state.queue.items[state.queue.nextIndex].id !== id) {
        throw new Error('History queue inconsistent: queue item id mismatch');
      }
      if (state.storage === undefined) {
        throw new Error('Storage not initialized');
      }

      if (instanceId !== state.instanceId) {
        console.log('Ignored stray task result')
        return ;
      }

      const taskType = state.queue.items[state.queue.nextIndex].task.type;

      if (error === undefined) {
        state.queue.items[state.queue.nextIndex].synced = true;
        state.queue.nextIndex++;
        state.status = 'task_finished';

        if (taskType === 'manual_save') {
          state.saveStatus = 'success';
        }

      } else {
        const err = {
          msg: error.msg,
          custom: error.custom,
        }
        if (taskType === 'auto_save') {
          state.storage.autosaveError = err;
        } else if (taskType === 'manual_save') {
          state.storage.manualSaveError = err;
          state.saveStatus = 'error';
        }
        state.status = 'error';
      }
    },
    resume: (state) => {
      if (state.storage === undefined) {
        throw new Error('Storage not initialized');
      }
      if (state.status === 'error' || state.status === 'paused') {
        state.status = 'task_finished';
        state.storage.autosaveError = undefined;
        state.storage.manualSaveError = undefined;
        onResume(state);
      } else {
        console.error('Cannot resume storage queue');
      }
    },
    updateSaveStatus: (state, action: PayloadAction<SaveStatus>) => {
      state.saveStatus = action.payload;
    },
    updateStatus: (state, action: PayloadAction<StorageStatus>) => {
      state.status = action.payload;
    },
    init: (state, action: PayloadAction<{ type: string }>) => {
      const { type } = action.payload;
      state.status = 'idle';
      state.saveStatus = 'idle';
      state.unsyncedChangesCounter = 0;
      state.instanceId = Date.now();
      state.storage = { type };
      state.queue = {
        idCounter: 0,
        nextIndex: 0,
        items: []
      }
    },
    
    updateUnsyncedChangesCounter: (state, action: PayloadAction<number>) => {
      state.unsyncedChangesCounter = action.payload
    },
  },
  extraReducers: {
    ['browser/online']: (state) => {
      state.online = true;
    },
    ['browser/offline']: (state) => {
      state.online = false;
    }
  }
});

export const storageSelectors = {
  status: (state: RootState) => state.sheetStorage.status,
  queue: (state: RootState) => state.sheetStorage.queue,
  storage: (state: RootState) => state.sheetStorage.storage,
  storageSynced: (state: RootState) => !(state.sheetStorage.queue.items.length - state.sheetStorage.queue.nextIndex > 0 || state.sheetStorage.unsyncedChangesCounter > 0),
}
export const storageActions = { ...storageSlice.actions, processQueue, saveChanges, unsyncedChange };

//This thunk is automatically dispatched by storageMiddleware 
export function processQueue() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.sheetStorage.status === 'idle'
      || state.sheetStorage.status === 'task_finished'
      || (state.sheetStorage.status === 'offline_paused' && state.sheetStorage.online === true)) {
      // pause history saving when offline
      if (state.sheetStorage.online === false) {
        dispatch(storageActions.updateStatus('offline_paused'))
        return;
      }
      // resume history
      if (state.sheetStorage.status === 'offline_paused' && state.sheetStorage.online === true) {
        dispatch(storageActions.updateStatus('task_finished'))
      }

      const { queue } = state.sheetStorage;
      if (state.sheetStorage.storage === undefined) {
        console.error('Storage engine not initialized');
        return;
      }
      if (queue.nextIndex < queue.items.length) {
        dispatch(storageActions.updateStatus('processing'));
        const {id: taskId, task} = queue.items[queue.nextIndex];
        const instanceId = getState().sheetStorage.instanceId;

        if (task.type === 'auto_save') {
          const result = await swAutoSave(task.payload.message, task.payload.contentObj);
          if (result === true) {
            dispatch(storageActions.processResult({ id: taskId, instanceId }));
          } else {
            const error = result.errMsg;
            const customErrObj = result.customErrObj;
            dispatch(storageActions.processResult({ id: taskId, instanceId, error: {msg: error, custom: customErrObj}}));
          }
        } else if (task.type === 'manual_save') {
          console.log('processing manual save task')
          const result = await swManualSave();
          console.log('Manual save result', result)
          if (result === true) {
            dispatch(storageActions.processResult({ id: taskId, instanceId }));
          } else {
            const error = result.errMsg;
            const customErrObj = result.customErrObj;
            dispatch(storageActions.processResult({ id: taskId, instanceId, error: {msg: error, custom: customErrObj}}));
          }
        } else {
          throw new Error('Unknown task type in task queue')
        }
      } else {
        dispatch(storageActions.updateStatus('idle'))
      }
    }
  }
}

export function saveChanges() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.sheetStorage.storage === undefined) {
      console.error('Storage engine not initialized');
      return;
    }
    dispatch(storageActions.updateSaveStatus('saving'));
    // force enqueue of all delayed updates
    for (let sync of Object.values(unsyncedChanges)) {
      sync();
    }

    // enqueue manual save task
    dispatch(storageActions.enqueueTask({
      type: 'manual_save',
      payload: undefined
    }));
    dispatch(processQueue())
  }
}

function onResume(state: SheetStorage) {
  if (state.storage !== undefined) {
    if (state.storage.type === 'github') {
      //ghOnResume(state.storageEngine.state)
    }
  }
}

const unsyncedChanges: {[key: string]: () => void} = {}
export function unsyncedChange(payload: {key: string, unsynced: (() => void) | false }) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { key, unsynced } = payload;
    if (unsynced === false) {
      delete unsyncedChanges[key];
    } else {
      unsyncedChanges[key] = unsynced;
    }
    dispatch(storageActions.updateUnsyncedChangesCounter(Object.values(unsyncedChanges).length ))
  }
}

function initSheetStorage(engineType: EngineType) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    // clear map of unsynced changes of previously loaded sheet
    for (let key of Object.keys(unsyncedChanges)) {
      delete unsyncedChanges[key];
    }
    dispatch(storageActions.init({ type: engineType }));
  }
}

function initStorageWorker(engineType: EngineType, getState: () => RootState) {
  if (engineType === 'github') {
    const initPayload = {
      ghToken: getState().auth.accessToken
    }
    return swInit(engineType, initPayload);
  } else {
    throw new Error('Unknown storage engine type')
  }
}

export function loadSheet(engineType: EngineType, location: any) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(sheetActions.startLoading());
    console.log('loading sheet')
    dispatch(initSheetStorage(engineType));
    const iid = getState().sheetStorage.instanceId;
    await initStorageWorker(engineType, getState)
    const result = await swLoadSheet(location);
    // ignore stray results
    if (getState().sheetStorage.instanceId !== iid) {
      console.log('ignored result for previously loaded sheet')
      return ;
    }
    console.log('LOAD SHEET RESULT: ', result)
    if ('json' in result) {
      const { json, sheetId } = result;
      dispatch(sheetActions.initFromJson({ json, sheetId}));
      dispatch(UndoActionCreators.clearHistory())
    } else {
      dispatch(sheetActions.setErrorMessage({ message: result.errMsg, newState: "load_error" }))
    }
  }
}

export default storageSlice.reducer;