import styled from "styled-components";
import React from "react";
import Weather from "./Weather";

const StyledWeather = styled(Weather)`
  width: 300px !important;
  
  .MuiPaper-root {
    width: 300px !important;
  }
`;

export default function WeatherMiniature(props) {

  return <StyledWeather {...props} miniature/>
}
