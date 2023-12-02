import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from "./Auth";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';

const EditNote = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [fundName, setFundName] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);

    useEffect(() => {
        authFetch(`${process.env.REACT_APP_API_ROOT}/note/${params.noteId}`)
            .then((response) => response.json())
            .then((data) => {
                setFundName(data.fundName);
                setContent(data.content);
                setPublished(data.published);
                console.log(data.published); // FIXME: Undefined
            })
    }, []);

    const handleSave = async () => {
        const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/note/${params.noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                published: published
            })
        })
        //const message = await response.json();
    }
    const handlePublish = async () => {
        setPublished(true);
        console.log("handlePublish", published)
        await handleSave();
        navigate('/Research');
    }

    return (
        <Stack>
            <Typography variant="h5">New note for {fundName}</Typography>
            <MDEditor
                value={content}
                height="700px"
                onChange={(value, viewUpdate) => setContent(value)}
            />
            <FormControlLabel control={<Switch checked={published} onChange={(event) => { setPublished(event.target.checked) }} />} label={published ? "Published" : "Draft"} />
            <Button variant="outlined" onClick={handleSave}>Save</Button>
            <Button variant="contained" onClick={handlePublish}>Publish</Button>
        </Stack>
    );
}

export default EditNote;