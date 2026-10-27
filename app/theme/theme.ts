import { createTheme } from '@mui/material/styles';

const theme = createTheme(
  {
    colorSchemes: {
      light: true,
      dark: true,
    },
    cssVariables: {
      colorSchemeSelector: 'class',
    },

    // colorSchemes: {
    //   light: {
    //     palette: {
    //       primary: {
    //         main: '#4F46E5',
    //         light: '#818CF8',
    //         dark: '#3730A3',
    //         contrastText: '#FFFFFF',
    //       },
    //       secondary: {
    //         main: '#0E7490',
    //         light: '#67E8F9',
    //         dark: '#155E75',
    //         contrastText: '#FFFFFF',
    //       },
    //       error: {
    //         main: '#B91C1C',
    //         light: '#FCA5A5',
    //         dark: '#7F1D1D',
    //         contrastText: '#FFFFFF',
    //       },
    //       warning: {
    //         main: '#92400E',
    //         light: '#FCD34D',
    //         dark: '#78350F',
    //         contrastText: '#FFFFFF',
    //       },
    //       info: {
    //         main: '#0369A1',
    //         light: '#7DD3FC',
    //         dark: '#075985',
    //         contrastText: '#FFFFFF',
    //       },
    //       success: {
    //         main: '#15803D',
    //         light: '#86EFAC',
    //         dark: '#166534',
    //         contrastText: '#FFFFFF',
    //       },
    //       background: {
    //         default: '#F8FAFC',
    //         paper: '#FFFFFF',
    //       },
    //       text: {
    //         primary: '#172033',
    //         secondary: '#475569',
    //         disabled: '#94A3B8',
    //       },
    //       divider: '#E2E8F0',
    //     },
    //   },

    //   dark: {
    //     palette: {
    //       primary: {
    //         main: '#A5B4FC',
    //         light: '#C7D2FE',
    //         dark: '#818CF8',
    //         contrastText: '#111827',
    //       },
    //       secondary: {
    //         main: '#67E8F9',
    //         light: '#A5F3FC',
    //         dark: '#22D3EE',
    //         contrastText: '#082F49',
    //       },
    //       error: {
    //         main: '#FCA5A5',
    //         light: '#FECACA',
    //         dark: '#F87171',
    //         contrastText: '#111827',
    //       },
    //       warning: {
    //         main: '#FCD34D',
    //         light: '#FDE68A',
    //         dark: '#FBBF24',
    //         contrastText: '#111827',
    //       },
    //       info: {
    //         main: '#7DD3FC',
    //         light: '#BAE6FD',
    //         dark: '#38BDF8',
    //         contrastText: '#111827',
    //       },
    //       success: {
    //         main: '#86EFAC',
    //         light: '#BBF7D0',
    //         dark: '#4ADE80',
    //         contrastText: '#052E16',
    //       },
    //       background: {
    //         default: '#0B1020',
    //         paper: '#121A2B',
    //       },
    //       text: {
    //         primary: '#E5E7EB',
    //         secondary: '#A7B0C0',
    //         disabled: '#667085',
    //       },
    //       divider: '#334155',
    //     },
    //   },
    // },

    // typography: {
    //   fontFamily: 'Roboto, sans-serif',
    // },
  },
  {
    // components theme overide
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 250ms ease, color 250ms ease',
          },

          '*, *::before, *::after': {
            transition:
              'background-color 250ms ease, color 250ms ease, border-color 250ms ease',
          },

          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              transitionDuration: '0ms !important',
            },
          },
        },
      },
    },
  },
);

export default theme;
