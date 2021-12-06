import { configureStore } from '@reduxjs/toolkit';
import sheetReducer from '../components/Sheet/sheetSlice'

export const store = configureStore({
  reducer: {
    sheet: sheetReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;