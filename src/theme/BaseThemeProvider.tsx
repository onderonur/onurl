import React from 'react';
import theme from '@/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

type BaseThemeProviderProps = React.PropsWithChildren<{}>;

function BaseThemeProvider({ children }: BaseThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default BaseThemeProvider;
