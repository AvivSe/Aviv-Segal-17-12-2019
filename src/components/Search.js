import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import CurrentWeather from "./CurrentWeather";
import FiveDaysOfDailyForecasts from "./5DaysOfDailyFrorecasts";
import { StyledCard } from "./styled";
import { useSelector } from "react-redux";
import { getSelectedCity } from "../redux/weather/weather.selectors";
import Fade from "@material-ui/core/Fade";

export default function Search() {
  const city = useSelector(getSelectedCity);
  const [zoom, setZoom] = useState(false);

  useEffect(function() {
    setZoom(false);
    setTimeout(function() {
      setZoom(true);
    }, 250);
  }, [city]);

  return (
    <div className={"mainContent"} style={{ maxWidth: "1080px" }}>
      <SearchBox />
      <StyledCard>
        <Fade in={zoom}>
          <div>{city && <CurrentWeather city={city} />}</div>
        </Fade>
        {city && <FiveDaysOfDailyForecasts city={city} />}
      </StyledCard>
    </div>
  );
}
