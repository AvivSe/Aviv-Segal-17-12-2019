import {deepPurple, grey} from "@material-ui/core/colors";

import Lora from '../assets/Lora.ttf';

const lora = {
  fontFamily: 'Lora',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Lora'),
    local('Lora-Regular'),
    url(${Lora}) format('ttf')
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const extraProps = {
  typography: {
    fontFamily: 'Lora, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lora],
      },
    },
  },
};
export const lightThemeOptions = {
  palette: {
    primary: deepPurple,
    secondary: deepPurple
  },
  ...extraProps
};

export const darkThemeOptions = {
  palette: {
    type: "dark",
    primary: grey,
    secondary: grey
  },
  ...extraProps
};
