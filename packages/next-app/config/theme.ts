import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#17B978',
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
