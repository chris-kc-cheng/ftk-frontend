import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login } from './Auth';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        // Prevent running the handler twice
        e.preventDefault();
        console.log('login', username, password)
        fetch(`${process.env.REACT_APP_API_ROOT}/login`, {
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
                    console.log('Login successful', token);
                }
                else {
                    console.log('Login failed');
                }
            })
    }

    return (
        <>
            <TextField label="Username" variant="standard" onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" variant="standard" onChange={(e) => setPassword(e.target.value)} type="password" />
            <Button variant="outlined" onClick={(e) => handleLogin(e)}>Login</Button>
        </>
    );
}

export default Login;