'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

export default theme;
