import { useEffect, useState } from 'react';
import { authFetch } from "./Auth";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Profile = () => {

  const [data, setData] = useState();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState();

  useEffect(() => {
    authFetch(`${process.env.REACT_APP_API_ROOT}/user/profile`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
  }, []);

  const handleClick = async () => {
      try {
        const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/user/reset`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
          })
        })
        const message = await response.json();
        setMessage(message);
      } catch (error) {
        console.log('handleClick error: ', error);
      }
    };

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
              {data.firstName[0] + data.lastName[0]}
            </Avatar>
            <TextField
              label="First Name"
              defaultValue={data.firstName}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <TextField
              label="Last Name"
              defaultValue={data.lastName}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <FormControlLabel control={<Checkbox disabled checked={data.isActive} />} label="Active" />
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
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          variant="filled"
        />
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          variant="filled"
        />
        <Button variant="contained" style={{maxWidth: '36px'}} onClick={handleClick}>Save</Button>
        {message &&
          <Alert severity={message.status}>
          <AlertTitle>{message.status}</AlertTitle>
            {message.message}
        </Alert>
        }

        <p>JSON: {JSON.stringify(data)}</p>
        <p>Environment: {process.env.NODE_ENV}</p>
        <p>API: {process.env.REACT_APP_API_ROOT}</p>
      </Stack>
    </Box>
  );
}

export default Profile;