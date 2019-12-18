import React from "react";
import {create} from "jss";
import {ThemeProvider as ScThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";
import Main from "./Main";
import {createMuiTheme, jssPreset, StylesProvider, ThemeProvider as MuiThemeProvider} from "@material-ui/core";
import {useSelector} from "react-redux";
import {getIsDarkMode} from "../redux/ui/ui.selectors";
import {deepPurple, grey} from "@material-ui/core/colors";

export const lightThemeOptions = {
  palette: {
    primary: deepPurple,
    secondary: deepPurple
  }
};

export const darkThemeOptions = {
  palette: {
    type: "dark",
    primary: grey,
    secondary: grey
  }
};

export default function App() {
  const isDarkTheme = useSelector(getIsDarkMode);
  const theme = createMuiTheme(isDarkTheme ? darkThemeOptions : lightThemeOptions);
  console.log(isDarkTheme);
  return (
    <StylesProvider jss={create({ plugins: [...jssPreset().plugins] })}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ScThemeProvider theme={theme}>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </ScThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </StylesProvider>
  );
}
