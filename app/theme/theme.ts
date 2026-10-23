'use client';

import { createTheme } from '@mui/material/styles';

const lightTokens = {
  '--md-sys-color-primary': 'rgb(85 89 146)',
  '--md-sys-color-surface-tint': 'rgb(85 89 146)',
  '--md-sys-color-on-primary': 'rgb(255 255 255)',
  '--md-sys-color-primary-container': 'rgb(224 224 255)',
  '--md-sys-color-on-primary-container': 'rgb(62 66 120)',
  '--md-sys-color-secondary': 'rgb(92 93 114)',
  '--md-sys-color-on-secondary': 'rgb(255 255 255)',
  '--md-sys-color-secondary-container': 'rgb(225 224 249)',
  '--md-sys-color-on-secondary-container': 'rgb(68 69 89)',
  '--md-sys-color-tertiary': 'rgb(75 92 146)',
  '--md-sys-color-on-tertiary': 'rgb(255 255 255)',
  '--md-sys-color-tertiary-container': 'rgb(219 225 255)',
  '--md-sys-color-on-tertiary-container': 'rgb(51 68 120)',
  '--md-sys-color-error': 'rgb(143 74 80)',
  '--md-sys-color-on-error': 'rgb(255 255 255)',
  '--md-sys-color-error-container': 'rgb(255 218 219)',
  '--md-sys-color-on-error-container': 'rgb(114 51 57)',
  '--md-sys-color-background': 'rgb(251 248 255)',
  '--md-sys-color-on-background': 'rgb(27 27 33)',
  '--md-sys-color-surface': 'rgb(246 250 254)',
  '--md-sys-color-on-surface': 'rgb(23 28 31)',
  '--md-sys-color-surface-variant': 'rgb(222 227 235)',
  '--md-sys-color-on-surface-variant': 'rgb(66 71 78)',
  '--md-sys-color-outline': 'rgb(114 120 126)',
  '--md-sys-color-outline-variant': 'rgb(194 199 206)',
  '--md-sys-color-shadow': 'rgb(0 0 0)',
  '--md-sys-color-scrim': 'rgb(0 0 0)',
  '--md-sys-color-inverse-surface': 'rgb(44 49 52)',
  '--md-sys-color-inverse-on-surface': 'rgb(237 241 245)',
  '--md-sys-color-inverse-primary': 'rgb(190 194 255)',
  '--md-sys-color-primary-fixed': 'rgb(224 224 255)',
  '--md-sys-color-on-primary-fixed': 'rgb(17 20 75)',
  '--md-sys-color-primary-fixed-dim': 'rgb(190 194 255)',
  '--md-sys-color-on-primary-fixed-variant': 'rgb(62 66 120)',
  '--md-sys-color-secondary-fixed': 'rgb(225 224 249)',
  '--md-sys-color-on-secondary-fixed': 'rgb(25 26 44)',
  '--md-sys-color-secondary-fixed-dim': 'rgb(197 196 221)',
  '--md-sys-color-on-secondary-fixed-variant': 'rgb(68 69 89)',
  '--md-sys-color-tertiary-fixed': 'rgb(219 225 255)',
  '--md-sys-color-on-tertiary-fixed': 'rgb(1 23 75)',
  '--md-sys-color-tertiary-fixed-dim': 'rgb(180 197 255)',
  '--md-sys-color-on-tertiary-fixed-variant': 'rgb(51 68 120)',
  '--md-sys-color-surface-dim': 'rgb(214 218 222)',
  '--md-sys-color-surface-bright': 'rgb(246 250 254)',
  '--md-sys-color-surface-container-lowest': 'rgb(255 255 255)',
  '--md-sys-color-surface-container-low': 'rgb(240 244 248)',
  '--md-sys-color-surface-container': 'rgb(234 238 242)',
  '--md-sys-color-surface-container-high': 'rgb(229 233 237)',
  '--md-sys-color-surface-container-highest': 'rgb(223 227 231)',
  '--md-extended-color-success-color': 'rgb(0 107 95)',
  '--md-extended-color-success-on-color': 'rgb(255 255 255)',
  '--md-extended-color-success-color-container': 'rgb(158 242 227)',
  '--md-extended-color-success-on-color-container': 'rgb(0 80 72)',
  '--md-extended-color-warning-color': 'rgb(130 85 19)',
  '--md-extended-color-warning-on-color': 'rgb(255 255 255)',
  '--md-extended-color-warning-color-container': 'rgb(255 221 184)',
  '--md-extended-color-warning-on-color-container': 'rgb(101 62 0)',
} as const;

const darkTokens = {
  '--md-sys-color-primary': 'rgb(190 194 255)',
  '--md-sys-color-surface-tint': 'rgb(190 194 255)',
  '--md-sys-color-on-primary': 'rgb(39 43 96)',
  '--md-sys-color-primary-container': 'rgb(62 66 120)',
  '--md-sys-color-on-primary-container': 'rgb(224 224 255)',
  '--md-sys-color-secondary': 'rgb(197 196 221)',
  '--md-sys-color-on-secondary': 'rgb(46 47 66)',
  '--md-sys-color-secondary-container': 'rgb(68 69 89)',
  '--md-sys-color-on-secondary-container': 'rgb(225 224 249)',
  '--md-sys-color-tertiary': 'rgb(180 197 255)',
  '--md-sys-color-on-tertiary': 'rgb(27 45 97)',
  '--md-sys-color-tertiary-container': 'rgb(51 68 120)',
  '--md-sys-color-on-tertiary-container': 'rgb(219 225 255)',
  '--md-sys-color-error': 'rgb(255 178 183)',
  '--md-sys-color-on-error': 'rgb(86 29 36)',
  '--md-sys-color-error-container': 'rgb(114 51 57)',
  '--md-sys-color-on-error-container': 'rgb(255 218 219)',
  '--md-sys-color-background': 'rgb(19 19 24)',
  '--md-sys-color-on-background': 'rgb(228 225 233)',
  '--md-sys-color-surface': 'rgb(15 20 23)',
  '--md-sys-color-on-surface': 'rgb(223 227 231)',
  '--md-sys-color-surface-variant': 'rgb(66 71 78)',
  '--md-sys-color-on-surface-variant': 'rgb(194 199 206)',
  '--md-sys-color-outline': 'rgb(140 145 152)',
  '--md-sys-color-outline-variant': 'rgb(66 71 78)',
  '--md-sys-color-shadow': 'rgb(0 0 0)',
  '--md-sys-color-scrim': 'rgb(0 0 0)',
  '--md-sys-color-inverse-surface': 'rgb(223 227 231)',
  '--md-sys-color-inverse-on-surface': 'rgb(44 49 52)',
  '--md-sys-color-inverse-primary': 'rgb(85 89 146)',
  '--md-sys-color-primary-fixed': 'rgb(224 224 255)',
  '--md-sys-color-on-primary-fixed': 'rgb(17 20 75)',
  '--md-sys-color-primary-fixed-dim': 'rgb(190 194 255)',
  '--md-sys-color-on-primary-fixed-variant': 'rgb(62 66 120)',
  '--md-sys-color-secondary-fixed': 'rgb(225 224 249)',
  '--md-sys-color-on-secondary-fixed': 'rgb(25 26 44)',
  '--md-sys-color-secondary-fixed-dim': 'rgb(197 196 221)',
  '--md-sys-color-on-secondary-fixed-variant': 'rgb(68 69 89)',
  '--md-sys-color-tertiary-fixed': 'rgb(219 225 255)',
  '--md-sys-color-on-tertiary-fixed': 'rgb(1 23 75)',
  '--md-sys-color-tertiary-fixed-dim': 'rgb(180 197 255)',
  '--md-sys-color-on-tertiary-fixed-variant': 'rgb(51 68 120)',
  '--md-sys-color-surface-dim': 'rgb(15 20 23)',
  '--md-sys-color-surface-bright': 'rgb(53 58 61)',
  '--md-sys-color-surface-container-lowest': 'rgb(10 15 18)',
  '--md-sys-color-surface-container-low': 'rgb(23 28 31)',
  '--md-sys-color-surface-container': 'rgb(27 32 35)',
  '--md-sys-color-surface-container-high': 'rgb(38 43 46)',
  '--md-sys-color-surface-container-highest': 'rgb(49 53 57)',
  '--md-extended-color-success-color': 'rgb(130 213 199)',
  '--md-extended-color-success-on-color': 'rgb(0 55 49)',
  '--md-extended-color-success-color-container': 'rgb(0 80 72)',
  '--md-extended-color-success-on-color-container': 'rgb(158 242 227)',
  '--md-extended-color-warning-color': 'rgb(248 187 113)',
  '--md-extended-color-warning-on-color': 'rgb(71 42 0)',
  '--md-extended-color-warning-color-container': 'rgb(101 62 0)',
  '--md-extended-color-warning-on-color-container': 'rgb(255 221 184)',
} as const;

function createPalette(tokens: typeof lightTokens) {
  return {
    primary: {
      main: tokens['--md-sys-color-primary'],
      contrastText: tokens['--md-sys-color-on-primary'],
    },
    secondary: {
      main: tokens['--md-sys-color-secondary'],
      contrastText: tokens['--md-sys-color-on-secondary'],
    },
    error: {
      main: tokens['--md-sys-color-error'],
      contrastText: tokens['--md-sys-color-on-error'],
    },
    success: {
      main: tokens['--md-extended-color-success-color'],
      contrastText: tokens['--md-extended-color-success-on-color'],
    },
    warning: {
      main: tokens['--md-extended-color-warning-color'],
      contrastText: tokens['--md-extended-color-warning-on-color'],
    },
    background: {
      default: tokens['--md-sys-color-background'],
      paper: tokens['--md-sys-color-surface'],
    },
    text: {
      primary: tokens['--md-sys-color-on-surface'],
      secondary: tokens['--md-sys-color-on-surface-variant'],
      disabled: tokens['--md-sys-color-outline'],
    },
    divider: tokens['--md-sys-color-outline-variant'],
    common: {
      black: tokens['--md-sys-color-shadow'],
      white: tokens['--md-sys-color-surface-container-lowest'],
    },
  };
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },

  colorSchemes: {
    light: {
      palette: createPalette(lightTokens),
    },
    dark: {
      palette: createPalette(darkTokens),
    },
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root, .light': {
          ...lightTokens,
        },
        '.dark': {
          ...darkTokens,
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
