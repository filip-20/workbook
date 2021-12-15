import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SheetPage from './components/SheetPage';
import HomePage from './components/HomePage';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="m-0 p-2">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/sheet" element={<SheetPage/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
