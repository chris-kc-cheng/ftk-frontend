import { useEffect, useState } from 'react';
import { authFetch } from "./Auth";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Profile = () => {

  const [data, setData] = useState();

  useEffect(() => {
    authFetch(`${process.env.REACT_APP_API_ROOT}/user/profile`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
  }, []);

  const handleClick = (e) => {
    alert("Clicked");
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Typography variant="h5">Profile</Typography>        
        {data &&
          <>
            <Avatar
              alt={data.first_name + ' ' + data.last_name}
              sx={{ width: 56, height: 56 }}
            >
              {data.first_name[0] + data.last_name[0]}
            </Avatar>
            <TextField
              label="First Name"
              defaultValue={data.first_name}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              label="Last Name"
              defaultValue={data.last_name}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <Stack direction="row" spacing={1}>
              {data.roles.map(role =>
                <Chip label={role} />
              )}
            </Stack>
          </>
        }

        <Divider />

        <Typography variant="h5">Change Password</Typography>
        <TextField
          label="Old Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          label="New Password"
          type="password"
          variant="filled"
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="filled"
        />
        <Button variant="contained" style={{maxWidth: '36px'}} onClick={handleClick}>Save</Button>

        <p>JSON: {JSON.stringify(data)}</p>
        <p>Environment: {process.env.NODE_ENV}</p>
        <p>API: {process.env.REACT_APP_API_ROOT}</p>
      </Stack>
    </Box>
  );
}

export default Profile;