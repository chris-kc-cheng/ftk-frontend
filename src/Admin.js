import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from "./Auth";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Admin = () => {

    const navigate = useNavigate();

    const [fundName, setFundName] = useState('');
    const [firmName, setFirmName] = useState('');
    const [launchDate, setLaunchDate] = useState();
    const [assetClasses, setAssetClasses] = useState([]);
    const [fundMessage, setFundMessage] = useState();
    const assetClassesList = ['Hedge Fund', 'Private Equity', 'Private Debt'];

    useEffect(() => {
        document.title = 'Admin';
    }, []);

    const handleCreateFund = async () => {
        try {
            const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/fund/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fundName: fundName,
                    firmName: firmName,
                    assetClasses: assetClasses,
                    launchDate: launchDate,
                })
            })
            const message = await response.json();
            setFundMessage(message);
            if (message.status === 'success') {
                navigate(`/Research/${message.id}`);
            }
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
            <TextField
                label="Firm Name"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                variant="standard"
            />
            <Autocomplete
                multiple
                id="tags-standard"
                options={assetClassesList}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                value={assetClasses}
                onChange={(event, newValue) => {
                  setAssetClasses(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Asset Classes"
                        placeholder="Select one or multiple"
                    />
                )}
            />
            <DatePicker
                label="Launch Date (Optional)"
                value={launchDate}
                onChange={(newValue) => setLaunchDate(newValue)}                
            />
            <Button variant="contained" style={{ maxWidth: '36px' }} onClick={handleCreateFund}>Create</Button>
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