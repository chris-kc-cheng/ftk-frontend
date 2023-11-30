import React from 'react';
import { useAuth } from "./Auth";

const Profile = () => {

  const [loggedIn] = useAuth();

  return (
    <>
        {loggedIn &&
            <p>Logged In</p>
        }
        {!loggedIn &&
            <p>Not logged in</p>
        }
        <p>Node: {process.env.NODE_ENV}</p>
        <p>API: {process.env.REACT_APP_API_ROOT}</p>
    </>
  );
}

export default Profile;