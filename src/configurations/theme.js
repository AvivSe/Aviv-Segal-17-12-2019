import Lora from "../assets/Lora.ttf";
import Roboto from "../assets/Roboto-Regular.ttf";

const lora = {
  fontFamily: "Lora",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 300,
  src: `
    local('Lora'),
    local('Lora-Regular'),
    url(${Lora}) format('ttf')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};

const roboto = {
  fontFamily: "San Francisco",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('San Francisco'),
    local('San Francisco-Regular'),
    url(${Roboto}) format('ttf')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
};
const extraProps = {
  typography: {
    fontFamily: "Lora, Arial",
    h5: {
      fontFamily: "Roboto, sans-serif"
    },
    h6: {
      fontFamily: "Roboto, sans-serif"
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [lora, roboto]
      }
    }
  }
};
export const lightThemeOptions = {
  palette: {
    primary: {
      light: '#7e57c2',
      main: '#673ab7',
      dark: '#4527a0',
      text: '#1a1a1a',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#7e57c2',
      main: '#1a1a1a',
      dark: '#4527a0',
      text: '#ffffff',
      contrastText: '#ffffff',
    }
  },
  ...extraProps
};

export const darkThemeOptions = {
  type: "dark",
  palette: {
    primary: {
      light: "#212121",
      main: "#333333",
      dark: "#151515",
      text: "#ffffff",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#212121",
      main: "#ffffff",
      dark: "#606060",
      text: "#ffffff",
      contrastText: "#b9b9b9",
    },  },
  ...extraProps
};
