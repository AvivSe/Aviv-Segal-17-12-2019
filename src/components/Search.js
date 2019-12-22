import React from "react";
import SearchBox from "./SearchBox";
import CurrentWeather from "./CurrentWeather";
import FiveDaysOfDailyForecasts from "./5DaysOfDailyFrorecasts";
import {StyledCard} from "./styled";
import {useSelector} from "react-redux";
import {getSelectedCity} from "../redux/weather/weather.selectors";

export default function Search() {
  const city = useSelector(getSelectedCity);

  return (
    <div className={"mainContent"} style={{ maxWidth: "1080px" }}>
      <SearchBox />
      <StyledCard>
        {city && <CurrentWeather city={city} />}
        {city && <FiveDaysOfDailyForecasts city={city} />}
      </StyledCard>
    </div>
  );
}
