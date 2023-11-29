import React, { useEffect, useState } from 'react';
import { login, useAuth, logout } from "./Auth";
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {

  const [loggedIn] = useAuth();

  return (
    <>
      {console.log('logged is ', loggedIn)}
      {!loggedIn &&
        <Login />
      }
      {loggedIn &&
        <Dashboard />
      }
    </>
  );
}

export default App;
