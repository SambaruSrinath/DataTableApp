import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers'; // Import the LocalizationProvider
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import the adapter
import DataTable from './components/DataTable'; // Your DataTable component

// Create a theme with custom configurations
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline ensures consistent baseline styling */}
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}> {/* Wrap your component */}
        <DataTable />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
