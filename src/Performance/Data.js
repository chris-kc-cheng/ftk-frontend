import { useEffect, useState } from 'react';
import { authFetch } from "../Auth";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Data = () => {

    return (
        <>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Download            
            </Button>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file                
            </Button>
        </>
    );
}

export default Data;