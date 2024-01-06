import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { githubApi } from "./githubApi/baseApi";

interface GhStorage {
  ghToken?: string
  status: string,
  errorMessage?: string,
  storageEngine?: { type: string, state: any }
}

const initialState: GhStorage = {
  status: 'not_initialized',
}

const ghStorageSlice = createSlice({
  name: 'githubStorage',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.ghToken = action.payload
    },
    processResult: (state, action: PayloadAction<{ errorMessage?: string, newEngineState?: any }>) => {
      const { errorMessage, newEngineState } = action.payload;
      if (errorMessage === undefined) {
        state.status = 'task_finished';
      } else {
        state.errorMessage = errorMessage;
        state.status = 'error';
      }
      if (newEngineState !== undefined) {
        state.storageEngine!.state = newEngineState;
      }
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
      state.storageEngine = {
        type,
        state: initialState
      }
    },
  }
});

export const storageActions = { ...ghStorageSlice.actions }

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    sheetStorage: ghStorageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;