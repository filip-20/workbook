import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";

export interface AuthState {
  accessToken?: string,
}

const initialState: AuthState = {
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | undefined>) => {
      state.accessToken = action.payload;
    }
  }
});

const { setAccessToken } = authSlice.actions;

function parseCookie(cookie: string): {key: string, value: string} {
  const tmp = cookie.split('=');
  const key = decodeURIComponent(tmp[0]).trim();
  const value = decodeURIComponent(tmp[1]).trim();
  return { key, value };
}

function getAccessToken(): string | null {
  for (let cookie of document.cookie.split(';')) {
    const { key, value } = parseCookie(cookie);
    if (key === 'github_access_token') {
      return value;
    }
  }
  return null;
}

function clearAccessToken() {
  document.cookie = 'github_access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
}

export const checkAuthState = () => {
  return (dispatch: AppDispatch) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      dispatch(setAccessToken(accessToken))
    } else {
      dispatch(setAccessToken(undefined))
    }
  }
}

export const logout = () => {
  return (dispatch: AppDispatch) => {
    clearAccessToken();
    dispatch(setAccessToken(undefined));
  }
}

export const selectAccessToken = (state: RootState) => { return state.auth.accessToken };

export default authSlice.reducer;