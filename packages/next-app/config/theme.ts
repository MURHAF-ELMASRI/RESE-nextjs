import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#17B978',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FACF5A',
    },
    action: {
      active: '#8BDCBC',
      hoverOpacity: 0.3,
    },
    text: {
      primary: '#071A52',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gray: {
      main: '#D8D8D8',
      contrastText: '#17B978',
    },
  },

  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#071A52',
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        body1: {
          color: '#071A52',
        },
      },
    },
  },
});
