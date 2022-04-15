import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    background: { paper: '#a0dcff', default: '#a8dcfa' },
    primary: {
      main: '#6b46c1',
    },
    secondary: {
      main: '#d53f8c',
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
