import React from 'react';
import theme from '@/theme';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

interface BaseThemeProviderProps {
  children: React.ReactNode;
}

function BaseThemeProvider({ children }: BaseThemeProviderProps) {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default BaseThemeProvider;
