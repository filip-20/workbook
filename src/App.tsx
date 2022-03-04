import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from './components/Navigation';
import SheetPage from './components/SheetPage';
import HomePage from './components/HomePage';
import RepoPage from './components/RepoPage';
import RepoListPage from './components/RepoListPage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkAuthState, selectAccessToken, selectAuthState, selectUser } from './store/authSlice';
import LogoutPage from './components/LogoutPage';
import { useUsersGetAuthenticatedQuery } from './services/githubApi/endpoints/users';

function App() {
  const dispatch = useAppDispatch();

  const authState = useAppSelector(selectAuthState);
  const accessToken = useAppSelector(selectAccessToken);
  if (authState === 'unknown' && !accessToken) {
    // Action that sets accessToken if it is given in cookies 
    dispatch(checkAuthState());
  }
  // Load user info if we have accessToken and authState is 'unknown'.
  // Query result is catched by extraReducer in authSlice.
  useUsersGetAuthenticatedQuery(undefined, {skip: !(authState === 'unknown' && accessToken)})
  
  return (
    <BrowserRouter>
      <Navigation />
      <div className="m-0 p-2">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/logout" element={<LogoutPage/>} />
        <Route path="/repos" element={<RepoListPage />} />
        <Route path="/repos/:page" element={<RepoListPage />} />
        <Route path="/repo/:repo" element={<RepoPage/>} />
        <Route path="/repo/:repo/tree/:branch" element={<RepoPage />} />
        <Route path="/repo/:repo/tree/:branch/*" element={<RepoPage />} />
        <Route path="/repo/:repo/blob/:branch/*" element={<RepoPage />} />
        <Route path="/sheet" element={<SheetPage/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
