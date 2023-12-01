import { useEffect, useState } from 'react';
import { authFetch } from "./Auth";
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const Research = () => {

    const [fundList, setFundList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Research';
    }, []);

    useEffect(() => {
        authFetch(`${process.env.REACT_APP_API_ROOT}/fund/all`)
        .then((response) => response.json())
        .then((data) => {
            setFundList(data);
        })
    }, []);

    return (
        <Stack spacing={2}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={fundList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option._id.$oid === value._id.$oid}
                onChange={(event, newValue) => {
                    if (newValue) {
                        console.log(newValue.name, newValue._id.$oid, `/Research/${newValue._id.$oid}`);
                        navigate(`/Research/${newValue._id.$oid}`); // Not redirect
                    }
                }}
                sx={{ width: 300 }}
                renderInput={(params) =>
                    <TextField {...params} label="Search a Fund" variant="standard" />}
            />
        </Stack>
    );
}

export default Research;