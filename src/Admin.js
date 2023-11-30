import { useState } from 'react';
import { authFetch } from "./Auth";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Admin = () => {
    
    const [fundName, setFundName] = useState('');
    const [fundMessage, setFundMessage] = useState();

    const handleCreateFund = async () => {
        try {
          const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/fund/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: fundName
            })
          })
          const message = await response.json();
          setFundMessage(message);
        } catch (error) {
          console.log('handleCreateFund error: ', error);
        }
      };

    return (
        <Stack spacing={2}>
            <Typography variant="h5">Create new fund</Typography>
            <TextField
              label="Fund Name"
              value={fundName}
              onChange={(e) => setFundName(e.target.value)}
              variant="standard"
            />
            <Button variant="contained" style={{maxWidth: '36px'}} onClick={handleCreateFund}>Create</Button>
            {fundMessage &&
            <Alert severity={fundMessage.status}>
                <AlertTitle>{fundMessage.status}</AlertTitle>
                {fundMessage.message}
            </Alert>            
            }
            <Divider />
        </Stack>
    );
}

export default Admin;