import { configureStore } from '@reduxjs/toolkit';
import sheetReducer from '../features/sheet/slice/sheetSlice';
import { githubApi } from '../api/githubApi/endpoints/repos';
import authReducer from '../features/auth/authSlice';
import storageReducer from '../features/sheetStorage/sheetStorage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { storageMiddleware } from './storageMiddleware';

//const jsonState = localStorage.getItem('reduxState')
//const preloadedState = jsonState === null ? undefined : {sheet: JSON.parse(jsonState)}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sheet: sheetReducer,
    sheetStorage: storageReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware, storageMiddleware),
  /*preloadedState*/
});

// enable listener behavior for the store
setupListeners(store.dispatch)

store.subscribe(() => {
  //console.log('Saving state as JSON string');
  //console.log(store.getState().sheet);
  //localStorage.setItem('reduxState', JSON.stringify(store.getState().sheet));
});

store.dispatch({type: window.navigator.onLine ? 'browser/online' : 'browser/offline'});
window.addEventListener('online', () => store.dispatch({type: 'browser/online'}))
window.addEventListener('offline', () => store.dispatch({type: 'browser/offline'}))

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
