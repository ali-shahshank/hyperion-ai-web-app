'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,

  palette: {
    primary: {
      main: '#0000FF',
    },
    background: {
      default: '#F9F9F9',
      paper: '#212222',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0,0,0,0.7)',
      disabled: 'rgba(0,0,0,0.38)',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    divider: 'rgba(0,0,0,0.12)',
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--background-primary': '#F9F9F9',
          '--background-secondary': '#212222',
          '--background-tertiary': 'rgba(0,0,0,0.7)',
          '--accent-primary': '#0000FF',
          '--black': '#000000',
          '--white': '#FFFFFF',
          '--text-primary': '#000000',
          '--text-secondary': 'rgba(0,0,0,0.7)',
          '--text-disabled': 'rgba(0,0,0,0.38)',
          '--text-light-primary': '#FFFFFF',
          '--text-light-secondary': 'rgba(255,255,255,0.7)',
          '--text-light-tertiary': 'rgba(255,255,255,0.38)',
          '--stroke-dark': 'rgba(0,0,0,0.12)',
          '--stroke-light': 'rgba(255,255,255,0.38)',
        },
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default theme;
