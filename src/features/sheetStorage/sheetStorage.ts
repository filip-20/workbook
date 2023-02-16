import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "../../app/store";

import { processRecord as ghProcessRecord, mergeChanges as ghSaveChanges, onResume as ghOnResume } from "./github/githubStorage";


export type StorageStatus = 'not_initialized' | 'idle' | 'task_finished' | 'processing' | 'paused' | 'error' | 'offline_paused'

export interface HistoryRecord {
  id: number,
  message: string,
  content: string,
  synced: boolean,
  timestamp: number,
}

export interface HistoryQueue {
  idCounter: number,
  nextIndex: number,
  items: Array<HistoryRecord>
}

export interface SheetStorage {
  status: StorageStatus,
  errorMessage?: string,
  queue: HistoryQueue,
  online: boolean,
  storageEngine?: { type: string, state: any }
  unsyncedChanges: { [key: string]: () => void },
}

const initialState: SheetStorage = {
  status: 'not_initialized',
  online: false,
  queue: {
    idCounter: 0,
    nextIndex: 0,
    items: []
  },
  unsyncedChanges: {},
}

const storageSlice = createSlice({
  name: 'sheetStorage',
  initialState,
  reducers: {
    enqueueChange: (state, action: PayloadAction<{ content: string, message: string }>) => {
      const { content, message } = action.payload;
      state.queue.items.push({
        id: state.queue.idCounter++,
        message,
        content,
        synced: false,
        timestamp: Math.floor(Date.now() / 1000)
      })
    },
    processResult: (state, action: PayloadAction<{ id: number, errorMessage?: string, newEngineState?: any }>) => {
      const { id, errorMessage, newEngineState } = action.payload;
      if (state.queue.nextIndex >= state.queue.items.length) {
        throw new Error('History queue inconsistent: nextIndex is too big');
      }
      if (state.queue.items[state.queue.nextIndex].id !== id) {
        throw new Error('History queue inconsistent: queue item id mismatch');
      }
      if (errorMessage === undefined) {
        state.queue.items[state.queue.nextIndex].synced = true;
        state.queue.nextIndex++;
        state.status = 'task_finished';
      } else {
        state.errorMessage = errorMessage;
        state.status = 'error';
      }
      if (newEngineState !== undefined) {
        state.storageEngine!.state = newEngineState;
      }
    },
    resume: (state) => {
      if (state.status === 'error' || state.status === 'paused') {
        state.status = 'task_finished';
        state.errorMessage = undefined;
        onResume(state);
      } else {
        console.error('Cannot resume storage queue');
      }
    },
    updateStatus: (state, action: PayloadAction<StorageStatus>) => {
      state.status = action.payload;
    },
    updateState: (state, action: PayloadAction<any>) => {
      if (state.storageEngine !== undefined) {
        state.storageEngine.state = action.payload;
      } else {
        console.error('SheetStorage: storage engine is not initialized');
      }
    },
    init: (state, action: PayloadAction<{ type: string, initialState: any }>) => {
      const { type, initialState } = action.payload;
      state.status = 'idle';
      state.unsyncedChanges = {};
      state.storageEngine = {
        type,
        state: initialState
      }
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      state.errorMessage = action.payload;
    },
    unsyncedChange: (state, action: PayloadAction<{ key: string, unsynced: (() => void) | false }>) => {
      const { key, unsynced } = action.payload;
      if (unsynced === false) {
        delete state.unsyncedChanges[key];
      } else {
        state.unsyncedChanges[key] = unsynced;
      }
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

export const storageActions = { ...storageSlice.actions, processQueue, saveChanges };
export const storageSelectors = {
  status: (state: RootState) => state.sheetStorage.status,
  queue: (state: RootState) => state.sheetStorage.queue,
  storageEngine: (state: RootState) => state.sheetStorage.storageEngine,
  errorMessage: (state: RootState) => state.sheetStorage.errorMessage,
  storageSynced: (state: RootState) => !(state.sheetStorage.queue.items.length - state.sheetStorage.queue.nextIndex > 0 || Object.values(state.sheetStorage.unsyncedChanges).length > 0),
}

/* This thunk is automatically dispatched by storageMiddleware */
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
      if (state.sheetStorage.storageEngine === undefined) {
        console.error('Storage engine not initialized');
        return;
      }
      if (queue.nextIndex < queue.items.length) {
        dispatch(storageActions.updateStatus('processing'));
        const record = queue.items[queue.nextIndex];
        if (state.sheetStorage.storageEngine.type === 'github') {
          dispatch(ghProcessRecord(record));
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
    if (state.sheetStorage.storageEngine === undefined) {
      console.error('Storage engine not initialized');
      return;
    }

    // force enqueue of all delayed updates
    for (let sync of Object.values(state.sheetStorage.unsyncedChanges)) {
      sync();
    }

    if (state.sheetStorage.storageEngine.type === 'github') {
      dispatch(ghSaveChanges());
    }
  }
}

function onResume(state: SheetStorage) {
  if (state.storageEngine !== undefined) {
    if (state.storageEngine.type === 'github') {
      ghOnResume(state.storageEngine.state)
    }
  }
}

export default storageSlice.reducer;