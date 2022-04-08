import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from './components/Navigation';
import SheetPage from './components/SheetPage';
import RepoPage from './components/RepoPage';
import RepoListPage from './components/RepoListPage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { authSelectors, saveAuthState } from './store/authSlice';
import LogoutPage from './components/LogoutPage';
import { useUsersGetAuthenticatedQuery } from './services/githubApi/endpoints/users';
import Err404Page from './components/Err404Page';
import LoginPage from './components/LoginPage';

function App() {
  const dispatch = useAppDispatch();

  const authState = useAppSelector(authSelectors.authState);
  const user = useAppSelector(authSelectors.user);
  const accessToken = useAppSelector(authSelectors.accessToken);
  const tokenState = useAppSelector(authSelectors.tokenState);

  // After user info is loaded, token is marked as tested
  useUsersGetAuthenticatedQuery(undefined, { skip: (tokenState === 'noToken' || tokenState === 'tokenTested') });

  useEffect(() => {
    if (user && tokenState === 'tokenTested' && accessToken) {
      console.log('saving user to localstorage');
      saveAuthState(user, accessToken);
    }
  }, [user, tokenState])

  return (
    <BrowserRouter basename="/workbook">
      <Navigation />
      <Routes>
        <Route path='*' element={<Err404Page />} />
        <Route path="/" element={<RepoListPage />} />
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/repos" element={<RepoListPage />} />
        <Route path="/repos/:page" element={<RepoListPage />} />
        <Route path="/repo/:repo" element={<RepoPage />} />
        <Route path="/repo/:repo/*" element={<RepoPage />} />
        <Route path="/sheet/:repo/*" element={<SheetPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
