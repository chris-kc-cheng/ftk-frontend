import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from "../Auth";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Chip from '@mui/material/Chip';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NoteCard from './NoteCard';

const Fund = () => {

  const params = useParams();
  const navigate = useNavigate();

  const [fund, setFund] = useState();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    authFetch(`${process.env.REACT_APP_API_ROOT}/fund/${params.fundId}`)
      .then((response) => response.json())
      .then((data) => {
        setFund(data);
        console.log('Fund Details', data);
      }).catch(e => console.log(e))
    authFetch(`${process.env.REACT_APP_API_ROOT}/fund/${params.fundId}/note`)
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        console.log('Fund Notes', data);
      }).catch(e => console.log(e))
  }, [params.fundId]);

  const handleNewNote = async () => {
    const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/note/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fundId: params.fundId
      })
    })
    const message = await response.json();
    navigate(`/Research/Note/${message.id}`)
  }

  return (
    <>
      <Stack spacing={2}>
        {fund &&
          <>
            <Stack direction="row" spacing={1}>
              {fund.assetClasses.map(assetClass =>
                <Chip label={assetClass} />
              )}
            </Stack>
            <Typography variant="h5">{fund.name}</Typography>
            <Typography variant="subtitle1">{fund.firm}</Typography>
            {fund.launchDate &&
              <Typography variant="subtitle2">Launched: {fund.launchDate}</Typography>
            }
            {/*notes && notes.map(note =>
              <NoteCard note={note} />
            )*/}

          </>
        }
      </Stack>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="New Note"
          icon={<AssignmentOutlinedIcon />}
          tooltipTitle="New Note"
          onClick={handleNewNote}
        />
      </SpeedDial>
    </>
  );
}

export default Fund;
