import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from "../Auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';

const EditNote = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [fundId, setFundId] = useState('');
    const [fundName, setFundName] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);

    useEffect(() => {
        authFetch(`${process.env.REACT_APP_API_ROOT}/note/${params.noteId}`)
            .then((response) => response.json())
            .then((data) => {
                setFundId(data.fundId);
                setFundName(data.fundName);
                setContent(data.content);
                setPublished(data.published);
                console.log(data.published);
            })
    }, [params.noteId]);

    const save = async (p) => {
        await authFetch(`${process.env.REACT_APP_API_ROOT}/note/${params.noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                published: p
            })
        })        
    }

    const handleSave = async () => {
        await save(published);
    }

    const handlePublish = async () => {
        await save(true);
        navigate('/Research');
    }

    const handleCancel = async () => {
        navigate(`/Research/${fundId}`);
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h5">New note for {fundName}</Typography>
            <MDEditor
                value={content}
                height="600px"
                onChange={(value, viewUpdate) => setContent(value)}
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'}}>            
                <FormControlLabel control={<Switch checked={published} onChange={(event) => { setPublished(event.target.checked) }} />} label={published ? "Published" : "Draft"} />
                <Stack spacing={2} direction='row'>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button variant="outlined" onClick={handleSave}>Save</Button>
                    <Button variant="contained" onClick={handlePublish}>Publish</Button>
                </Stack>                
            </Box>
        </Stack>
    );
}

export default EditNote;