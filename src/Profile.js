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
    </>
  );
}

export default Profile;