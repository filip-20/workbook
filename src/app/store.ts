import { configureStore } from '@reduxjs/toolkit';
import sheetReducer from '../features/sheet/sheetSlice';
import { githubApi } from '../api/githubApi/endpoints/repos';
import authReducer from '../features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

//const jsonState = localStorage.getItem('reduxState')
//const preloadedState = jsonState === null ? undefined : {sheet: JSON.parse(jsonState)}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sheet: sheetReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
  /*preloadedState*/
});

// enable listener behavior for the store
setupListeners(store.dispatch)

store.subscribe(() => {
  //console.log('Saving state as JSON string');
  //console.log(store.getState().sheet);
  //localStorage.setItem('reduxState', JSON.stringify(store.getState().sheet));
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
