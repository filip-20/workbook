import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean,
  accessToken?: string,
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const repoExplorerSlice = createSlice({
  name: 'repoExplorer',
  initialState,
  reducers: {
  }
});
