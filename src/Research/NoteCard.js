import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from '@uiw/react-md-editor';

const NoteCard = (props) => {

    const navigate = useNavigate();
    const note = props.note;

    const initial = note.authorName.split(' ').map(x => x[0]).join('');

    return (
        <Card sx={{ maxWidth: 800 }}>
        <CardHeader
          avatar={
            <Avatar aria-label="author">
              {initial}
            </Avatar>
          }
          action={
            <IconButton aria-label="edit" onClick={() => navigate(`/Research/Note/${note._id}`)}>
              <EditIcon />
            </IconButton>
          }
          title={
          <>
            <Button style={{textAlign: 'left'}} onClick={() => navigate(`/Research/${note.fundId}`)}>{note.fundName}</Button>
            {!note.published && <Chip label="Draft" color="warning" size="small" />}
          </>}
          subheader={note.modifiedDate}
        >              
        </CardHeader>
        <CardContent>
          <MDEditor.Markdown source={note.content} />
        </CardContent>          
      </Card>
    );
}

export default NoteCard;