import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { theme } from "../theme";
import { ThemeProvider as ScThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Snackbar from "./Snackbar";

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <MainContent />
          <Snackbar/>
        </BrowserRouter>
      </ScThemeProvider>
    </MuiThemeProvider>
  );
}
