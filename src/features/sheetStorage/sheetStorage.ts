import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";

import { processRecord as ghProcessRecord, mergeChanges as ghSaveChanges, onResume as ghOnResume } from "./github/githubStorage";


export type StorageStatus = 'not_initialized' | 'ready' | 'processing' | 'paused' | 'error'

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
  storageEngine?: { type: string, state: any }
}

const initialState: SheetStorage = {
  status: 'not_initialized',
  queue: {
    idCounter: 0,
    nextIndex: 0,
    items: []
  }
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
        state.status = 'ready';
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
        state.status = 'ready';
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
      state.status = 'ready';
      state.storageEngine = {
        type,
        state: initialState
      }
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      state.errorMessage = action.payload;
    }
  }
});

export const storageActions = { ...storageSlice.actions, processQueue, saveChanges };
export const storageSelectors = {
  status: (state: RootState) => state.sheetStorage.status,
  queue: (state: RootState) => state.sheetStorage.queue,
  storageEngine: (state: RootState) => state.sheetStorage.storageEngine,
  errorMessage: (state: RootState) => state.sheetStorage.errorMessage,
}

export function processQueue() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.sheetStorage.status === 'ready') {
      const { queue } = state.sheetStorage;
      if (state.sheetStorage.storageEngine === undefined) {
        console.error('Storage engine not initialized');
        return;
      }
      if (queue.nextIndex < queue.items.length) {
        dispatch(storageActions.updateStatus('processing'));
        const record = queue.items[queue.nextIndex];
        if (state.sheetStorage.storageEngine.type === 'github') {
          console.log('dispatching');
          dispatch(ghProcessRecord(record));
        }
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