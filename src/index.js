import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./components/App";
import { theme } from "./theme";
import { ThemeProvider as ScThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ScThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ScThemeProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
