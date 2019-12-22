import Grow from "@material-ui/core/Grow";
import { iconMap } from "./standalone/AccuWeatherIcons";
import React, { useEffect, useState } from "react";
import { Column, DailyForecasts, FlexibleColumn, LookingAhead, StyledDailyIcon } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { getIsFahrenheit, getSelectedCity } from "../redux/weather/weather.selectors";
import { toCelsius, weekDay } from "../utils/tiny";
import weatherService from "../AccuWeatherService";
import { openSnackbar } from "../redux/ui/ui.actions";
import moment from "moment";
import Tooltip from "./standalone/Tooltip";
import Typography from "@material-ui/core/Typography";

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
            dispatch(openSnackbar("5DaysForecasts Can't init: " + e));
          }
        })();
      }
    },
    [dispatch, city]
  );

  function renderDailyText(text, degrees, icon) {
    const [text1, text2] = text.split("w/").map(text => text.trim());
    return (
      <Column>
        <div className={"dailyText"}>
          <Typography variant={"body1"} color="secondary">
            {text1}
            {text2 && `, ${text2}`}
          </Typography>
        </div>
        <Tooltip
          title={`${!isFahrenheit ? degrees : toCelsius(degrees)}° ${!isFahrenheit ? "F" : "c"}`}
          aria-label="celsius / fahrenheit"
        >
          <Typography variant={"body1"} color={"secondary"} className={"dailyText degree"}>
            {isFahrenheit ? `${degrees}` : `${toCelsius(degrees)}`}° {isFahrenheit ? "F" : "c"}
          </Typography>
        </Tooltip>
        <div>
          <StyledDailyIcon as={iconMap[icon]} />
        </div>
      </Column>
    );
  }

  return (
    !!city &&
    !!forecast && (
      <div>
        <LookingAhead variant={"body1"}>
          <Typography variant={"h6"} color={"secondary"}>
            Looking ahead
          </Typography>
          <Typography variant={"h6"} color={"secondary"}>
            {forecast.headlineText}
          </Typography>
        </LookingAhead>
        <DailyForecasts>
          {forecast.dailyForecasts.map(function(
            {
              dateString,
              minimumFahrenheit,
              maximumFahrenheit,
              dayTimeIcon,
              dayTimeText,
              nightTimeIcon,
              nightTimeText
            },
            i
          ) {
            const date = new Date(dateString);

            const formattedDate = moment(date).format("DD MMM");
            const isToday = date.getDay() === new Date().getDay();
            return (
              <Grow in timeout={500 * (i + 1)} key={`${i}_${date}`}>
                <div className={`day ${isToday ? "contrast" : ""}`}>
                  <Typography
                    variant={"body1"}
                    color={isToday ? "primary" : "secondary"}
                    className={`dayName ${isToday ? " today" : ""}`}
                  >
                    {isToday ? "Today" : `${weekDay[date.getDay()]}`}, {formattedDate}
                  </Typography>

                  <FlexibleColumn>
                    <div className={"dayTime"}>
                      <div className={"dailyTimeLabel"}>Day</div>
                      {renderDailyText(dayTimeText, maximumFahrenheit, dayTimeIcon)}
                    </div>
                    <div className={"nightTime"}>
                      <div className={"dailyTimeLabel"}>Night</div>
                      {renderDailyText(nightTimeText, minimumFahrenheit, nightTimeIcon)}
                    </div>
                  </FlexibleColumn>
                </div>
              </Grow>
            );
          })}
        </DailyForecasts>
      </div>
    )
  );
}
