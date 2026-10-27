'use client';

import { createTheme } from '@mui/material/styles';
import { blue, green, orange, cyan, grey } from '@mui/material/colors';

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
