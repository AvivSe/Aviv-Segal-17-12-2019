import React from "react";
import { create } from "jss";
import { ThemeProvider as ScThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import { createMuiTheme, jssPreset, StylesProvider, ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getIsDarkMode } from "../redux/ui/ui.selectors";
import { darkThemeOptions, lightThemeOptions } from "../configurations/theme";

export default function App() {
  const isDarkTheme = useSelector(getIsDarkMode);
  const theme = createMuiTheme(isDarkTheme ? darkThemeOptions : lightThemeOptions);

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
