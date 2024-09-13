import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#A0153E",
    },
    secondary: {
      main: "#5A20CB",
    },
    black:{
        main:"#1B1A55"
    },
    background: {
      main:"#070F2B",
      default: "#0F0F0F",
      paper: "#0F0F0F",
    },
    text: {
      primary: "#EEEEEE", // Default text color for the dark theme
    },
  },
  // Add other customizations like spacing, shape, etc.
});
