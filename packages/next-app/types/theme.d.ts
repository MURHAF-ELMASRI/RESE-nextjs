import { ButtonPropsColorOverrides as ButtonPropsColorOverridesMUI } from '@mui/material/Button';

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    gray?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends ButtonPropsColorOverridesMUI {
    gray: true;
  }
}
