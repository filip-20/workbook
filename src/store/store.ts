import { configureStore } from '@reduxjs/toolkit';
import sheetReducer from './sheetSlice';
import repoExplorerReducer from './repoExplorerSlice';
import repoListReducer from './repoListSlice';
import authReducer from './authSlice';

const jsonState = localStorage.getItem('reduxState')
const preloadedState = jsonState === null ? undefined : {sheet: JSON.parse(jsonState)}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sheet: sheetReducer,
    repoList: repoListReducer,
    repoExplorer: repoExplorerReducer,
  },
  preloadedState
});

store.subscribe(() => {
  console.log('Saving state as JSON string');
  localStorage.setItem('reduxState', JSON.stringify(store.getState().sheet));
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;