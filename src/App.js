import React from 'react';
import { useAuth } from "./Auth";
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {

  const [loggedIn] = useAuth();

  return (
    <>
      {console.log('App logged is ', loggedIn)}
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
