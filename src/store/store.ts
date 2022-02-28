import { configureStore } from '@reduxjs/toolkit';
import sheetReducer from './sheetSlice';
import { githubApi } from '../services/githubApi/endpoints/repos';
import repoExplorerReducer from './repoExplorerSlice';
import repoListReducer from './repoListSlice';
import authReducer from './authSlice';

const jsonState = localStorage.getItem('reduxState')
const preloadedState = jsonState === null ? undefined : {sheet: JSON.parse(jsonState)}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sheet: sheetReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
  preloadedState
});

store.subscribe(() => {
  console.log('Saving state as JSON string');
  localStorage.setItem('reduxState', JSON.stringify(store.getState().sheet));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
