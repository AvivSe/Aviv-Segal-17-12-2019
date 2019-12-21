import Grow from "@material-ui/core/Grow";
import { iconMap } from "./standalone/AccuWeatherIcons";
import React from "react";
import { ResponsiveText, StyledDailyIcon } from "./styled";
import { useSelector } from "react-redux";
import { getIsFahrenheit } from "../redux/weather/weather.selectors";
import {toCelsius, weekDay} from "../utils/tiny";

export default function FiveDaysOfDailyForecasts() {
  const dailyForecasts = [];
  const isFahrenheit = useSelector(getIsFahrenheit);

  return (
    <div>
      {dailyForecasts.map(function(
        {
          Date: dateString,
          Temperature: {
            Minimum: { Value: minimumFahrenheit },
            Maximum: { Value: maximumFahrenheit }
          },
          Day: { Icon: dayTimeIcon, IconPhrase: dayTimeText },
          Night: { Icon: nightTimeIcon, IconPhrase: nightTimeText }
        },
        i
      ) {
        const date = new Date(dateString);
        return (
          <Grow key={`${i}_${date}`} in timeout={500 * (i + 1)}>
            <div>
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
            </div>
          </Grow>
        );
      })}
    </div>
  );
}
