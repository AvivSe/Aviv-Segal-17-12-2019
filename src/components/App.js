import React, {useEffect} from "react";
import {create} from "jss";
import {ThemeProvider as ScThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";
import Main from "./Main";
import {createMuiTheme, jssPreset, StylesProvider, ThemeProvider as MuiThemeProvider} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getIsDarkMode} from "../redux/ui/ui.selectors";
import {darkThemeOptions, lightThemeOptions} from "../configurations/theme";
import useGeolocation from "react-hook-geolocation";
import { setSelectedCity} from "../redux/weather/weather.actions";

export default function App() {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(getIsDarkMode);
  const theme = createMuiTheme(isDarkTheme ? darkThemeOptions : lightThemeOptions);

  const geolocation = useGeolocation();
  console.log(geolocation);

  useEffect(() => {
    dispatch(setSelectedCity({ name: 'Tel Aviv' ,key: '215854'}));
  },[dispatch]);

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
