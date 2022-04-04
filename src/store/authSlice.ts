import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { githubApi } from "../services/githubApi/endpoints/users";
import { isUser } from "./authSlice.guard";
import { AppDispatch, RootState } from "./store";

/** @see {isUser} ts-auto-guard:type-guard */
export interface User {
  login: string,
  avatarUrl: string,
}

export interface AuthState {
  authState: 'authenticated' | 'unauthenticated' | 'tokenExpired',
  user?: User,
  accessToken?: string,
  tokenTested: boolean,
}

const initialState: AuthState = {
  authState: getAccessToken() ? 'authenticated' : 'unauthenticated',
  user: getSavedUser(),
  accessToken: getAccessToken(),
  tokenTested: false,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<'authenticated' | 'unauthenticated' | 'tokenExpired'>) => {
      state.authState = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | undefined>) => {
      state.accessToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(githubApi.endpoints.usersGetAuthenticated.matchFulfilled,
      (state, { payload }) => {
        state.user = {login: payload.login, avatarUrl: payload.avatar_url}
        state.authState = 'authenticated'
        state.tokenTested = true;
      });
  }
});

function parseCookie(cookie: string): {key: string, value: string} {
  const tmp = cookie.split('=');
  const key = decodeURIComponent(tmp[0]).trim();
  const value = decodeURIComponent(tmp[1]).trim();
  return { key, value };
}

function getAccessToken(): string | undefined {
  for (let cookie of document.cookie.split(';')) {
    const { key, value } = parseCookie(cookie);
    if (key === 'github_access_token') {
      return value;
    }
  }
}

export function clearAccessToken() {
  document.cookie = 'github_access_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
}

export function saveUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getSavedUser(): User | undefined {
  const u = localStorage.getItem('user');
  if (u) {
    let user;
    try {
      user = JSON.parse(u);
    } catch (e) {}
    if (user) {
      if (isUser(user)) {
        return user as User;
      }
    }
  }
}

export function clearSavedUser() {
  localStorage.removeItem('user');
}

export const logout = () => {
  return (dispatch: AppDispatch) => {
    clearAccessToken();
    clearSavedUser();
    dispatch(authActions.setAccessToken(undefined));
  }
}

export const authActions = authSlice.actions;
export const authSelectors = {
  authState: (state: RootState) => state.auth.authState,
  accessToken: (state: RootState) => state.auth.accessToken,
  user: (state: RootState) => state.auth.user,
  tokenTested: (state: RootState) => state.auth.tokenTested,
}

export default authSlice.reducer;