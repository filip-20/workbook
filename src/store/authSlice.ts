import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { githubApi } from "../services/githubApi/endpoints/users";
import { isUser } from "./authSlice.guard";
import { AppDispatch, RootState } from "./store";
import config from '../config.json';


/** @see {isUser} ts-auto-guard:type-guard */
export interface User {
  login: string,
  avatarUrl: string,
}

export interface AuthState {
  authState: 'authenticated' | 'unauthenticated' | 'authPending' | 'tokenExpired',
  user?: User,
  accessToken?: string,
  tokenState: 'noToken' | 'tokenLoaded' | 'tokenTested',
  error?: string
}

const initialState: AuthState = {
  authState: getSavedAccessToken() ? 'authenticated' : 'unauthenticated',
  user: getSavedUser(),
  accessToken: getSavedAccessToken(),
  tokenState: getSavedAccessToken() ? 'tokenLoaded' : 'noToken',
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
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.authState = "unauthenticated";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(requestAccessToken.pending, (state) => {
      state.authState = 'authPending';
    });
    builder.addCase(requestAccessToken.fulfilled, (state, action) => {
      // this state will trigger usersGetAuthenticatedQuery in App component
      state.tokenState = 'tokenLoaded';
      state.accessToken = action.payload;
    });
    builder.addCase(requestAccessToken.rejected, (state, action) => {
      state.authState = 'unauthenticated';
      state.error = action.error.message;
    });
    builder.addMatcher(githubApi.endpoints.usersGetAuthenticated.matchFulfilled,
      (state, { payload }) => {
        state.user = { login: payload.login, avatarUrl: payload.avatar_url }
        state.authState = 'authenticated'
        state.tokenState = 'tokenTested';
      });
  }
});

export const requestAccessToken = createAsyncThunk
  <any, string, { state: RootState }>('auth/requestAccessToken', async (code) => {
    const { authUrl } = config.backend;
    const response = await fetch(`${authUrl}?code=${encodeURIComponent(code)}`, { method: 'GET', cache: 'reload' });
    const json = await response.json();
    if ('accessToken' in json) {
      return json.accessToken;
    }
    if ('error' in json) {
      throw Error(json.error);
    }
    throw Error('Invalid response from authentication backend');
  });

function getSavedAccessToken(): string | undefined {
  return localStorage.getItem('accessToken') || undefined;
}

export function saveAuthState(user: User, accessToken: string) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('accessToken', accessToken);
}

export function clearSavedAuthState() {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
}

function getSavedUser(): User | undefined {
  const u = localStorage.getItem('user');
  if (u) {
    let user;
    try {
      user = JSON.parse(u);
    } catch (e) { }
    if (user) {
      if (isUser(user)) {
        return user as User;
      }
    }
  }
}

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(authActions.logout());
    clearSavedAuthState();
  }
}

export const authActions = { requestAccessToken, ...authSlice.actions };
export const authSelectors = {
  authState: (state: RootState) => state.auth.authState,
  accessToken: (state: RootState) => state.auth.accessToken,
  user: (state: RootState) => state.auth.user,
  tokenState: (state: RootState) => state.auth.tokenState,
  error: (state: RootState) => state.auth.error,
}

export default authSlice.reducer;