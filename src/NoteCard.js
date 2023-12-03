import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from '@uiw/react-md-editor';

const NoteCard = (props) => {

    const navigate = useNavigate();
    const note = props.note;

    return (
        <Card sx={{ maxWidth: 800 }}>
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
          title={<Button onClick={() => navigate(`/Research/${note.fund._id.$oid}`)}>{note.fund.name}</Button>}              
          subheader={note.modifiedDate.$date}
        >              
        </CardHeader>
        <CardContent>
          <MDEditor.Markdown source={note.content} />
        </CardContent>          
      </Card>
    );
}

export default NoteCard;