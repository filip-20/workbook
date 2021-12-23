import { configureStore } from '@reduxjs/toolkit';
import sheetReducer from '../components/Sheet/sheetSlice'

const jsonState = localStorage.getItem('reduxState')
const preloadedState = jsonState === null ? undefined : JSON.parse(jsonState)

export const store = configureStore({
  reducer: {
    sheet: sheetReducer,
  },
  preloadedState
});

store.subscribe(()=>{
  console.log('Saving state as JSON string');
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;