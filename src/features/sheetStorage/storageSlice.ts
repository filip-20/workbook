import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../../app/store"
import { EngineType, Command, Task, CommandResult, TaskResult, swCommand, InitCommand, swTask } from "../../storageWorker/workerApi"
import produce from "immer"
import { sheetActions } from "../sheet/slice/sheetSlice"
import { ActionCreators as UndoActionCreators } from 'redux-undo'

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

type TaskQueueState = 'idle' | 'task_finished' | 'processing' | 'paused' | 'error' | 'offline_paused'
interface StorageState {
  instanceId: number,
  taskQueueState: TaskQueueState,
  taskError?: string,
  taskQueue: TaskQueue,
  online: boolean,
  unsyncedChangesCounter: number,
  storageEngine?: {
    type: string,
    custom: any,
  }
}

const initialState: StorageState = {
  instanceId: -1,
  taskQueueState: 'idle',
  taskQueue: {
    idCounter: 0,
    nextIndex: 0,
    items: []
  },
  online: false,
  unsyncedChangesCounter: 0,
}

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<{ engineType: EngineType }>) => {
      const online = state.online;
      // copy initialState
      
      state.instanceId = Date.now();
      state.taskError = undefined;
      state.taskQueueState = 'idle'
      state.taskQueue = {
        idCounter: 0,
        nextIndex: 0,
        items: []
      }
      state.unsyncedChangesCounter = 0;
      state.storageEngine = {
        type: action.payload.engineType,
        custom: undefined
      }
/*
      state = produce(initialState, draft => {
        draft.instanceId = Date.now();
        draft.online = online;
        draft.storageEngine = {
          type: action.payload.engineType,
          custom: undefined
        }
      })*/
      console.log('initialized state with', state)
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.taskQueue.items.push({
        id: state.taskQueue.idCounter++,
        synced: false,
        timestamp: Math.floor(Date.now() / 1000),
        task: action.payload
      })
    },
    processTaskResult: (state, action: PayloadAction<{ id: number, instanceId: number, taskResult: TaskResult }>) => {
      const { id, instanceId, taskResult } = action.payload;
      if (instanceId !== state.instanceId) {
        // this can happen when some task takes too much time (maybe due poor network connection),
        // and by the time it finishes another workbook file was loaded
        console.log('Ignored stray task result')
        return;
      }

      // sanity checks
      if (state.taskQueue.nextIndex >= state.taskQueue.items.length) {
        throw new Error('History queue inconsistent: nextIndex is too big');
      }
      if (state.taskQueue.items[state.taskQueue.nextIndex].id !== id) {
        throw new Error('History queue inconsistent: queue item id mismatch');
      }
      if (state.storageEngine === undefined) {
        throw new Error('Storage not initialized');
      }

      if (taskResult.custom !== undefined) {
        state.storageEngine.custom = taskResult.custom;
      }
      if (taskResult.result === "success") {
        state.taskQueue.items[state.taskQueue.nextIndex].synced = true;
        state.taskQueue.nextIndex++;
        state.taskQueueState = 'task_finished';
      } else {
        state.taskQueueState = 'error';
        state.taskError = taskResult.errorMessage
      }
    },
    processCommandResult: (state, action: PayloadAction<{ instanceId: number, commandResult: CommandResult }>) => {
      const { instanceId, commandResult } = action.payload;
      if (instanceId !== state.instanceId) {
        // this can happen when some task takes too much time (maybe due poor network connection),
        // and by the time it finishes another workbook file was loaded
        console.log('Ignored stray command result')
        return;
      }
      console.log('process command state', state)
      if (state.storageEngine === undefined) {
        throw new Error('Storage not initialized');
      }

      if (commandResult.custom !== undefined) {
        state.storageEngine.custom = commandResult.custom;
      }
    },
    setUnsyncedChanges: (state, action: PayloadAction<{ counter: number }>) => {
      state.unsyncedChangesCounter = action.payload.counter;
    },
    setTaskQueueState: (state, action: PayloadAction<TaskQueueState>) => {
      state.taskQueueState = action.payload;
    },
    resumeQueue: (state) => {
      if (state.storageEngine === undefined) {
        throw new Error('Storage not initialized');
      }
      if (state.taskQueueState === 'error' || state.taskQueueState === 'paused') {
        state.taskQueueState = 'task_finished';
        state.taskError = undefined;
      } else {
        console.error('Cannot resume storage queue');
      }
    }
  },
  extraReducers: {
    'browser/online': (state) => {
      state.online = true;
    },
    'browser/offline': (state) => {
      state.online = false;
    }
  }
});
const privActions = storageSlice.actions;
export const storageActions = { unsyncedChange, enqueueTask, processQueue, resume };
export const storageSelectors = {
  storageEngine: (state: RootState) => state.storage.storageEngine,
  instanceId: (state: RootState) => state.storage.instanceId,
  taskError: (state: RootState) => state.storage.taskError,
  taskQueue: (state: RootState) => state.storage.taskQueue,
  taskState: (index: number) => (state: RootState) => {
    if (index === state.storage.taskQueue.nextIndex) {
      if (state.storage.taskError) {
        return 'error'
      }
      if (state.storage.taskQueueState === 'processing') {
        return 'processing'
      }
      return 'waiting'
    } else if (index < 0) {
      return 'unknown'
    }
    return state.storage.taskQueue.nextIndex > index ?
      'done' : 'waiting'
  },
  storageSynced: (state: RootState) => {
    const queue = state.storage.taskQueue;
    const unfinishedTasks = queue.items.length - queue.nextIndex;
    return unfinishedTasks === 0
      && state.storage.unsyncedChangesCounter === 0
  },
  taskQueueState: (state: RootState) => state.storage.taskQueueState,
  unsyncedChanges: (state: RootState) => state.storage.unsyncedChangesCounter,
}

function processQueue() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.storage.taskQueueState === 'idle'
      || state.storage.taskQueueState === 'task_finished'
      || (state.storage.taskQueueState === 'offline_paused' && state.storage.online === true)) {
      // pause history saving when offline
      if (state.storage.online === false) {
        dispatch(privActions.setTaskQueueState('offline_paused'))
        return;
      }
      // resume history
      if (state.storage.taskQueueState === 'offline_paused' && state.storage.online === true) {
        dispatch(privActions.setTaskQueueState('task_finished'))
      }

      const queue = state.storage.taskQueue;
      if (state.storage.storageEngine === undefined) {
        console.error('Storage engine not initialized');
        return;
      }
      if (queue.nextIndex < queue.items.length) {
        dispatch(privActions.setTaskQueueState('processing'));
        const {id: taskId, task} = queue.items[queue.nextIndex];
        const instanceId = getState().storage.instanceId;

        console.log('starting task')
        const taskResult = await swTask(task);
        console.log('task finished')
        dispatch(privActions.processTaskResult({id: taskId, instanceId, taskResult}))
        if (instanceId !== getState().storage.instanceId) {
          return ;
        }
      } else {
        dispatch(privActions.setTaskQueueState('idle'))
      }
    }
  }
}
function resume() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(privActions.resumeQueue());
    dispatch(processQueue());
  }
}

export function enqueueTask(task: Task) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(privActions.addTask(task));
    if (getState().storage.taskQueueState === 'idle') {
      dispatch(processQueue())
    }
    // return task index
    return getState().storage.taskQueue.items.length - 1;
  }
}

export function runCommand(cmd: Command) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const instanceId = getState().storage.instanceId;
    const commandResult = await swCommand(cmd);
    dispatch(privActions.processCommandResult({ instanceId, commandResult }));
    return commandResult;
  }
}

function initStorageEngine(engineType: EngineType) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    switch (engineType) {
      case "github":
        const initCmd: InitCommand = {
          name: "init",
          payload: {
            engineType, 
            custom: {
              ghToken: getState().auth.accessToken
            }
          }
        }
        const res = await dispatch(runCommand(initCmd))
        return res;
      default:
        throw new Error('Unknown storage engine type')
    }
  }
}

export function loadSheet(engineType: EngineType, payload: any) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(privActions.init({ engineType }));
    const instanceId = getState().storage.instanceId;
    dispatch(sheetActions.startLoading());
    let res = await dispatch(initStorageEngine(engineType))
    if (instanceId !== getState().storage.instanceId) {
      return ;
    }
    if (res.result === "error") {
      dispatch(sheetActions.setErrorMessage({ message: res.errorMessage, newState: "load_error" }))
      return ;
    }

    res = await dispatch(runCommand({ name: 'load', payload }))
    if (instanceId !== getState().storage.instanceId) {
      return ;
    }
    if (res.result === "error") {
      dispatch(sheetActions.setErrorMessage({ message: res.errorMessage, newState: "load_error" }))
      return ;
    }

    const json = res.data!.json;
    const sheetId = res.data!.sheetId;
    dispatch(sheetActions.initSheet(json, sheetId));
    dispatch(UndoActionCreators.clearHistory())
  }
}

const unsyncedChanges: { [key: string]: () => void } = {}
export function unsyncedChange(payload: { key: string, unsynced: (() => void) | false }) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { key, unsynced } = payload;
    if (unsynced === false) {
      delete unsyncedChanges[key];
    } else {
      unsyncedChanges[key] = unsynced;
    }
    console.log('unsynced changes: ', unsyncedChanges)
    dispatch(privActions.setUnsyncedChanges({
      counter: Object.values(unsyncedChanges).length
    }))
  }
}

export function syncUnsyncedChanges() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    for (let sync of Object.values(unsyncedChanges)) {
      // sync should also calls unsyncedChange thunk
      // so counter, and list is updated 
      sync();
    }
  }
}