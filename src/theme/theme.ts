// src/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';

const defaultTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#0e9e57', 
    },
    secondary: {
      main:'#444444',
    },
    error: {
      main: '#ff0000',
    },
    background: {
        default: '#f8f9fc',
      }
  },
});

export default defaultTheme;
