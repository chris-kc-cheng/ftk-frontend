import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';

const EditNote = () => {

    const [markdown, setMarkdown] = useState('');

    return (
        <Stack>
            <Typography variant="h5">New</Typography>
            <MDEditor
                value={markdown}
                height="700px"
                onChange={(value, viewUpdate) => setMarkdown(value)}
            />
        </Stack>
    );
}

export default EditNote;