import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import App from './App';
import Research from './Research';
import Admin from './Admin';
import Profile from './Profile';
import Fund from './Fund';
import Note from './Note';
import EditNote from './EditNote';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1>Index</h1>} />
          <Route path="Research" element={
            <>
              <Research />
              <Outlet />
            </>}>
            <Route path=":fundId" element={<Fund />} />
            <Route path="Note/:noteId" element={<EditNote />} />
            <Route index element={<Note />} />
          </Route>
          <Route path="Home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
          <Route path="Performance" element={<h1>Performance</h1>} />
          <Route path="Client" element={<h1>Client</h1>} />
          <Route path="Market" element={<h1>Market</h1>} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Profile" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
