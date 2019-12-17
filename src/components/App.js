import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import {create} from 'jss';
import { jssPreset, StylesProvider, ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { theme } from "../theme";
import styled, { ThemeProvider as ScThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Snackbar from "./Snackbar";
import BottomNavigation from "./BottomNavigation";
import {GitHub} from "@material-ui/icons";
const StyledGitHub = styled(GitHub)`
  fill: ${({theme}) => theme.palette.common.white};
 `;

const WaterMark = styled.a`
color: ${({ theme }) => theme.palette.primary.light};
  
  `;
export default function App() {
  return (
    <StylesProvider jss={create({ plugins: [...jssPreset().plugins] })}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ScThemeProvider theme={theme}>
            <BrowserRouter>
              <Header />
              <MainContent />
              <StyledGitHub/><WaterMark
                href={'https://github.com/avivse/'}>github.com/avivse</WaterMark>
              <Snackbar />
              <BottomNavigation />
            </BrowserRouter>
          </ScThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </StylesProvider>
  );
}
