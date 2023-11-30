import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { authFetch } from './Auth';

const Home = () => {

    const [a, setA] = useState(0);
    const [b, setB] = useState(5);
    const [c, setC] = useState([0, 5]);
    const [sum, setSum] = useState();

    const handleAChange = (event, a) => {
        setA(a);
    }
    const handleBChange = (event, b) => {
        setB(b);
    }
    const handleCommit = (event) => {
        setC([a, b]);
    }
    useEffect(() => {
        if(c[0] === a && c[1] === b) {
            authFetch(`${process.env.REACT_APP_API_ROOT}/fund/add`, {
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
        }
    }, [a, b, c]);

    return (
        <Stack direction="column">
            <Slider valueLabelDisplay="auto" value={a} onChange={handleAChange} onChangeCommitted={handleCommit} />
            <Slider valueLabelDisplay="auto" value={b} onChange={handleBChange} onChangeCommitted={handleCommit} />
            <Typography variant="h1">{sum}</Typography>
        </Stack>
    );
}

export default Home;