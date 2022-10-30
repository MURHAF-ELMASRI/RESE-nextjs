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
  
    overrides: {
      MuiIconButton: {
        root: {
          color: "#071A52",
        },
      },
      MuiInput: {
        underline: {
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#9e9e9e",
          },
        }
      },
      // MuiTypography: {
      //   body1: {
      //     color: "#071A52",
      //   }
      // }
  },
    
  });
  