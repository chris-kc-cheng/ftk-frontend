import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { authFetch } from './Auth';

const Interactive = () => {

    const [a, setA] = useState(0);
    const [b, setB] = useState(5);
    const [i, setI] = useState(0);
    const [sum, setSum] = useState();

    const handleAChange = (event, a) => {
        setA(a);
    }
    const handleBChange = (event, b) => {
        setB(b);
    }
    const handleCommit = (event) => {
        setI(i + 1);
    }
    useEffect(() => {
        console.log(a, b)
        authFetch("http://127.0.0.1:5000/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ a: a, b: b })
        })
            .then((response) => response.json())
            .then((data) => {
                setSum(data.sum);
            })
    }, [i]); // Adding a, b to dependency array will trigger unnecessary API calls

    return (
        <Stack direction="column">
            <Slider valueLabelDisplay="auto" value={a} onChange={handleAChange} onChangeCommitted={handleCommit} />
            <Slider valueLabelDisplay="auto" value={b} onChange={handleBChange} onChangeCommitted={handleCommit} />
            <Typography variant="h1">{sum}</Typography>
        </Stack>
    );
}

export default Interactive;