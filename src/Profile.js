import { useEffect, useState } from 'react';
import { authFetch } from "./Auth";
import Alert from '@mui/material/Alert';
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
    document.title = 'Profile';
}, []);

  useEffect(() => {
    authFetch(`${process.env.REACT_APP_API_ROOT}/user`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
  }, []);

  const handleClick = async () => {
      try {
        const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/user/password`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
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
            {message.message}
        </Alert>
        }
      </Stack>
    </Box>
  );
}

export default Profile;