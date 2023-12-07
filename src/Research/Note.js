import React, { useEffect, useState } from 'react';
import { authFetch } from "../Auth";
import NoteCard from './NoteCard';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

const Note = () => {

  const options = [5, 10, 50, 100, 500];
  const [limit, setLimit] = useState(50);
  const [data, setData] = useState([]);

  const handleLoadMore = async () => {
    const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/note/?skip=${data.length}&limit=${limit}`)
    const json = await response.json();
    data.push(...json)
    setData([...data]); // Shadow copy thus a different reference for React to rerender
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/note/?skip=${0}&limit=${limit}`)
      const json = await response.json();
      setData(json);
    }
    fetchNotes(0, 50);
  }, [limit]);

  return (
    <>
      <Stack spacing={2}>
        {data.map(note =>
          <NoteCard key={note._id} note={note} />
        )}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="text" onClick={handleLoadMore}>Load more ...</Button>
        <Select
          value={limit}
          label="Notes"
          onChange={(e) => setLimit(e.target.value)}
        >
          {options.map((option => 
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}          
        </Select>
      </Stack>
    </>
  );
}

export default Note;
