import { createTheme } from "@material-ui/core";

export const theme = createTheme({
    palette: {
      primary: {
        main: "#17B978",
      },
      secondary: {
        main: "#FACF5A",
      },
      action: {
        active: "#8BDCBC",
        hoverOpacity: 0.3,
      },
    },
    typography: {
      allVariants: {
        color: "#071A52",
      },
    },
    overrides: {
      MuiIconButton: {
        root: {
          color: "#071A52",
        },
      },
    },
  });
  