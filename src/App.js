import React from 'react';
import { useAuth } from "./Auth";
import Login from './Login';
import Layout from './Layout';

// Dark Mode
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Material UI's Date
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {

  const [loggedIn] = useAuth();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {!loggedIn &&
          <Login />
        }
        {loggedIn &&
          <Layout />
        }
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
