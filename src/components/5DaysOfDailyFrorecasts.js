import Grow from "@material-ui/core/Grow";
import { iconMap } from "./standalone/AccuWeatherIcons";
import React, { useEffect, useState } from "react";
import { DailyForecastsHelper, ResponsiveText, Row, StyledCard, StyledDailyIcon } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { getIsFahrenheit, getSelectedCity } from "../redux/weather/weather.selectors";
import { toCelsius, weekDay } from "../utils/tiny";
import weatherService from "../AccuWeatherService";
import { openSnackbar } from "../redux/ui/ui.actions";

export default function FiveDaysOfDailyForecasts() {
  const dispatch = useDispatch();
  const [forecast, setForecast] = useState(null);
  const isFahrenheit = useSelector(getIsFahrenheit);
  const city = useSelector(getSelectedCity);

  useEffect(
    function() {
      if (!!city) {
        (async function() {
          try {
            setForecast(await weatherService.fetchFiveDaysOfDailyForecasts(city));
          } catch (e) {
            dispatch(openSnackbar(e.message));
          }
        })();
      }
    },
    [dispatch, city]
  );

  return (
    !!city &&
    !!forecast && (
      <Row justifyContent={"space-evenly"}>
        {forecast.dailyForecasts.map(function(
          { dateString, minimumFahrenheit, maximumFahrenheit, dayTimeIcon, dayTimeText, nightTimeIcon, nightTimeText },
          i
        ) {
          const date = new Date(dateString);
          return (
            <StyledCard key={`${i}_${date}`}>
              <Grow in timeout={500 * (i + 1)}>
                <DailyForecastsHelper>
                  <ResponsiveText fontSize={0.9}>{weekDay[date.getDay()]}</ResponsiveText>
                  <ResponsiveText fontSize={1.1}>
                    {isFahrenheit ? `${minimumFahrenheit}°F` : `${toCelsius(minimumFahrenheit)}°C`}~
                    {isFahrenheit ? `${maximumFahrenheit}°F` : `${toCelsius(maximumFahrenheit)}°C`}
                  </ResponsiveText>
                  <div className="dailyTime">
                    <ResponsiveText fontSize={1}>Day</ResponsiveText>
                    <ResponsiveText fontSize={1.1}>{dayTimeText}</ResponsiveText>
                    <StyledDailyIcon as={iconMap[dayTimeIcon]} />
                  </div>
                  <ResponsiveText fontSize={1}>Night</ResponsiveText>
                  <ResponsiveText fontSize={1.1}>{nightTimeText}</ResponsiveText>
                  <StyledDailyIcon as={iconMap[nightTimeIcon]} />
                  <ResponsiveText fontSize={0.8}>({date.toLocaleDateString()})</ResponsiveText>
                </DailyForecastsHelper>
              </Grow>
            </StyledCard>
          );
        })}
      </Row>
    )
  );
}
