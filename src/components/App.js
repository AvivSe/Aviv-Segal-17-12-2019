import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import {create} from 'jss';
import { jssPreset, StylesProvider, ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { theme } from "../theme";
import { ThemeProvider as ScThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Snackbar from "./Snackbar";
import BottomNavigation from "./BottomNavigation";

export default function App() {
  return (
    <StylesProvider jss={create({ plugins: [...jssPreset().plugins] })}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ScThemeProvider theme={theme}>
            <BrowserRouter>
              <Header />
              <MainContent />
              <Snackbar />
              <BottomNavigation />
            </BrowserRouter>
          </ScThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </StylesProvider>
  );
}
