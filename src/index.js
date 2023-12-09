import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import App from './App';
import Research from './Research/Research';
import AssetClasses from './Research/AssetClasses';
import AssetClass from './Research/AssetClass';
import Performance from './Performance/Performance';
import Data from './Performance/Data';
import Admin from './Admin';
import Profile from './Profile';
import Fund from './Research/Fund';
import Note from './Research/Note';
import EditNote from './Research/EditNote';
import Home from './Home';
import Equity from './Market/Equity';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <HashRouter>
      <Routes>        
        <Route path="/" element={<App />}>
          <Route index element={<h1>Index</h1>} />
          <Route path="Home" element={<Home />} />
          <Route path="Research" element={
            <>
              <Research />
              <Outlet />
            </>}>            
            <Route index element={<Note />} />
            <Route path="AssetClass">
              <Route index element={<AssetClasses />} />
              <Route path=":assetClass" element={<AssetClass />} />
            </Route>
            <Route path=":fundId" element={<Fund />} />
            <Route path="Note/:noteId" element={<EditNote />} />
          </Route>          
          <Route path="Risk">
            <Route index element={<Performance />} />
            <Route path="Data" element={<Data />} />
          </Route>
          <Route path="Client" element={<h1>Client</h1>} />
          <Route path="Market">
            <Route index element={<h1>Market</h1>} />
            <Route path="Equity" element={<Equity />} />
            <Route path="Currency" element={<h1>Currency</h1>} />
            <Route path="Cryptocurrency" element={<h1>Cryptocurrency</h1>} />
          </Route>
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
