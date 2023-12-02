import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from "./Auth";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from '@uiw/react-md-editor';

const Note = () => {

  const navigate = useNavigate();

  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);  

  const fetchNotes = async () => {
    const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/note/?skip=${0}&limit=${limit}`)  // Trailing slash cannot be removed
    const json = await response.json();
    setData(json);
  }

  const handleLoadMore = async () => {
    const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/note/?skip=${data.length}&limit=${limit}`)
    const json = await response.json();
    data.push(...json)
    setData([...data]); // Shadow copy thus a different reference for React to rerender
  }

  useEffect(() => {
    fetchNotes(0, limit);
  }, []);

  return (
    <>
      <Stack spacing={2}>
        {data.map(note =>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar aria-label="author">
                  {note.author.firstName[0] + note.author.lastName[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="edit" onClick={() => navigate(`/Research/Note/${note._id.$oid}`)}>
                  <EditIcon />
                </IconButton>
              }
              title={note.fund.name}
              subheader={note.modifiedDate.$date}
            />
            <CardContent>
              <MDEditor.Markdown source={note.content} />
            </CardContent>          
          </Card>
        )}
      </Stack>
      <Stack direction="row" spacing={2}>
      <Button variant="text" onClick={handleLoadMore}>Load more ...</Button>
      </Stack>
    </>
  );
}

export default Note;
