import { useRef, useState } from 'react';
import { authFetch } from "../Auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Data = () => {

    const hiddenFileInput = useRef(null);

    const [fileName, setFileName] = useState();

    const handleChange = () => {
        try {
            setFileName(hiddenFileInput.current.files[0].name);
        }
        catch(error) {
            setFileName(null);
        }
    }

    const handleDownload = async () => {
        try {
            const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/risk/data`);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = 'data.xlsx';
            link.click();
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.log('handleDownload error: ', error);
        }
    }

    const handleUpload = async () => {
        const data = new FormData();
        data.append('file', hiddenFileInput.current.files[0]);
        await authFetch(`${process.env.REACT_APP_API_ROOT}/risk/data`, {
            method: 'POST',
            body: data
        })
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h5" gutterBottom>
                Download Risk Data
            </Typography>
            <Divider />
            <Button component="label" variant="contained" onClick={handleDownload}>
                Download
            </Button>

            <Box sx={{ p: 1 }} />
            <Typography variant="h5" gutterBottom>
                Upload Risk Data
            </Typography>
            <Divider />
            <input
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                ref={hiddenFileInput}
                style={{display: 'none'}}
                onChange={handleChange}
            />
            <label htmlFor="fileInput">
                <Button variant="contained" color="primary" component="label" onClick={() => hiddenFileInput.current.click()}>
                    Choose file
                </Button>
                <Typography variant="body1" gutterBottom>
                    {fileName}
                </Typography>
            </label>
            <Button component="label" variant="contained" onClick={handleUpload} disabled={!fileName}>
                Upload
            </Button>
        </Stack>
    );
}

export default Data;