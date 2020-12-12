import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
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
