import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authFetch } from "./Auth";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
const Fund = () => {

  const navigate = useNavigate();

  const [fund, setFund] = useState();
  const params = useParams();

  useEffect(() => {
    authFetch(`${process.env.REACT_APP_API_ROOT}/fund/detail/${params.fundId}`)
      .then((response) => response.json())
      .then((data) => {
        setFund(data);
      })
  }, [params.fundId]);

  const handleNewNote = async () => {
    console.log('Clicked');
    const response = await authFetch(`${process.env.REACT_APP_API_ROOT}/note/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fundId: params.fundId
      })
    })
    const message = await response.json();
    navigate(`/Note/${message.id}`)
  }

  return (
    <Box>      
      <Stack spacing={0}>
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
          </>
        }        
      </Stack>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
          <SpeedDialAction
            key="New Note"
            icon={<AssignmentOutlinedIcon />}
            tooltipTitle="New Note"
            onClick={() => handleNewNote}
          />
      </SpeedDial>      
    </Box>
  );
}

export default Fund;
