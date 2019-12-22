import Grow from "@material-ui/core/Grow";
import {iconMap} from "./standalone/AccuWeatherIcons";
import React, {useEffect, useState} from "react";
import {DailyForecasts, FlexibleColumn, Row, StyledDailyIcon} from "./styled";
import {useDispatch, useSelector} from "react-redux";
import {getIsFahrenheit, getSelectedCity} from "../redux/weather/weather.selectors";
import {toCelsius, weekDay} from "../utils/tiny";
import weatherService from "../AccuWeatherService";
import {openSnackbar} from "../redux/ui/ui.actions";
import moment from "moment";
import Tooltip from "./standalone/Tooltip";

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
      <>
        <div className={"dailyText"}>
          {text1}
          {text2 && `, ${text2}`}
        </div>
        <Tooltip
          title={`${!isFahrenheit ? degrees : toCelsius(degrees)}° ${!isFahrenheit ? "F" : "c"}`}
          aria-label="celsius / fahrenheit"
        >
          <div className={"dailyText degree"}>
            {isFahrenheit ? `${degrees}` : `${toCelsius(degrees)}`}°
            <span className={"degreeLetter"}> {isFahrenheit ? "F" : "c"}</span>
          </div>
        </Tooltip>
        <div>
          <StyledDailyIcon as={iconMap[icon]} />
        </div>
      </>
    );
  }

  return (
    !!city &&
    !!forecast && (
      <div>
        <Row>
          Headline: {forecast.headlineText}
        </Row>
      <DailyForecasts>
        {forecast.dailyForecasts.map(function(
          { dateString, minimumFahrenheit, maximumFahrenheit, dayTimeIcon, dayTimeText, nightTimeIcon, nightTimeText },
          i
        ) {
          const date = new Date(dateString);

          const formattedDate = moment(date).format("DD MMM");
          const isToday = date.getDay() === new Date().getDay();
          return (
            <Grow in timeout={500 * (i + 1)} key={`${i}_${date}`}>
              <div className={`day ${isToday ? 'contrast' : ''}`}>
                <div className='dayHeader'>
                  <span className={'dayName'}>{isToday ? "Today" : `${weekDay[date.getDay()]}`}</span> {formattedDate}
                </div>
                <FlexibleColumn>
                  <div className={"dayTime"}>
                    <div className={"dailyTimeLabel"}>
                      <div>Day</div>
                    </div>
                    {renderDailyText(dayTimeText, maximumFahrenheit, dayTimeIcon)}
                  </div>
                  <div className={"nightTime"}>
                    <div className={"dailyTimeLabel"}>
                      <div>Night</div>
                    </div>
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
