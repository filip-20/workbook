import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { githubApi } from "../services/githubApi/endpoints/users";
import { AppDispatch, RootState } from "./store";


export interface User {
  login: string,
}

export interface AuthState {
  authState: 'unknown' | 'authenticated' | 'unauthenticated' | 'tokenExpired',
  accessToken?: string,
  user?: User,
}

const initialState: AuthState = {
  authState: 'unknown'
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<'unknown' | 'authenticated' | 'unauthenticated' | 'tokenExpired'>) => {
      state.authState = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | undefined>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(githubApi.endpoints.usersGetAuthenticated.matchFulfilled,
      (state, { payload }) => {
        state.user = {login: payload.login}
        state.authState = 'authenticated'
      });
  }
});

export const { setAuthState, setAccessToken } = authSlice.actions;

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
      dispatch(setAccessToken(accessToken));
    } else {
      dispatch(setAccessToken(undefined));
      dispatch(setAuthState('unauthenticated'));
    }
  }
}

export const logout = () => {
  return (dispatch: AppDispatch) => {
    clearAccessToken();
    dispatch(setAccessToken(undefined));
  }
}

export const selectAuthState = (state: RootState) => { return state.auth.authState };
export const selectAccessToken = (state: RootState) => { return state.auth.accessToken };
export const selectUser = (state: RootState) => { return state.auth.user };

export default authSlice.reducer;