import { useEffect, useState } from 'react';
import { login } from './Auth';

import { AccountCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const handleLogin = (e) => {
        // Prevent running the handler twice
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_ROOT}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(data => data.json())
            .then(token => {
                if (token.access_token) {
                    login(token);
                    setPassword('');
                    console.log('Login successful', token);
                }
                else {
                    console.log('Login failed');
                }
            })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia>
                <AccountCircle style={{ fontSize: 160 }} />
            </CardMedia>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5" component="div">Login</Typography>
                    <TextField label="Username" variant="standard" onChange={(e) => setUsername(e.target.value)} />
                    <TextField label="Password" variant="standard" onChange={(e) => setPassword(e.target.value)} type="password" />
                </Stack>
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={(e) => handleLogin(e)}>Login</Button>
            </CardActions>
        </Card>        
    );
}

export default Login;