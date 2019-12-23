import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getIsFahrenheit, getIsOneOfMyFavorite } from "../redux/weather/weather.selectors";
import { addToFavorites, addToHistory, removeFromFavorites } from "../redux/weather/weather.actions";
import { Favorite, FavoriteBorder , Refresh} from "@material-ui/icons";
import {openSnackbar, setNotPending, setOnPending} from "../redux/ui/ui.actions";
import weatherService from "../AccuWeatherService";
import Tooltip from "./standalone/Tooltip";
import { iconMap } from "./standalone/AccuWeatherIcons";
import Slide from "@material-ui/core/Slide";
import { Column, CurrentWeatherHelper, FavoriteIconHelper, Row, StyledMainIcon } from "./styled";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

export function CurrentWeather({ city, miniature }) {
  const dispatch = useDispatch();
  const [version, setVersion] = useState(0);
  const [weather, setWeather] = useState(null);

  const isFahrenheit = useSelector(getIsFahrenheit);

  useEffect(
    function() {
      if (!!city) {
        (async function() {
          const requestId = `${city.name}, ${new Date().toLocaleString()}`;
          try {
            dispatch(setOnPending(requestId));
            setWeather(await weatherService.fetchCurrentWeather(city));
            dispatch(addToHistory(city));
          } catch (e) {
            dispatch(openSnackbar("Failed fetch data"));
          } finally {
            dispatch(setNotPending(requestId));
          }
        })();
      }
    },
    [dispatch, city]
  );

  useEffect(
    function() {
      if (!!city && version !== 0) {
        (async function() {
          try {
            setWeather(await weatherService.fetchCurrentWeather(city));
            dispatch(openSnackbar("Fetching data"));
          } catch (e) {
            dispatch(openSnackbar(e));
          }
        })();
      }
    },
    [dispatch, city, version]
  );

  const isOneOfMyFavorites = useSelector(getIsOneOfMyFavorite(city));
  const FavoriteIcon = isOneOfMyFavorites ? Favorite : FavoriteBorder;

  function handleRefresh() {
    setVersion(version+1)
  }

  function handleFavoriteToggled() {
    if (isOneOfMyFavorites) {
      dispatch(removeFromFavorites(city.key));
      dispatch(openSnackbar(`${city.name} removed from favorites`));
    } else {
      dispatch(addToFavorites(city.key));
      dispatch(openSnackbar(`${city.name} added to your favorites`));
    }
  }
  const date = !!weather && new Date(weather.localObservationDateTime);

  return (
    !!weather &&
    !!city && (
      <CurrentWeatherHelper>
        <Row justifyContent={"space-between"}>
          <Row>
            <Slide in timeout={500} direction={"right"}>
              <div>
                <StyledMainIcon as={iconMap[weather.iconId]} />
              </div>
            </Slide>
            <Column>
              <Slide in timeout={750} direction={"down"}>
                <Typography variant="h5" color={"secondary"}>
                  {city.name}, {city.countryName}
                </Typography>
              </Slide>
              <Slide in timeout={500} direction={"down"}>
                <div>
                  <Tooltip
                    title={`${!isFahrenheit ? weather.imperial : weather.metric} °${!isFahrenheit ? "F" : "c"}`}
                    aria-label="celsius / fahrenheit"
                  >
                    <Typography variant="h4" color={"secondary"}>
                      {isFahrenheit ? weather.imperial : weather.metric}° {isFahrenheit ? "F" : "c"}
                    </Typography>
                  </Tooltip>
                </div>
              </Slide>
              <Slide in timeout={750} direction={"right"}>
                <div>
                  <Tooltip title={`Recently updated: ${date.toLocaleString()}`}>
                    <Typography variant="body2" color={"secondary"}>
                      <span>{date.toLocaleTimeString()}</span>
                      <span><IconButton onClick={handleRefresh} color={"primary"}><Refresh /></IconButton></span>
                    </Typography>
                  </Tooltip>
                </div>
              </Slide>
            </Column>
          </Row>
          <Slide direction={"left"} in timeout={500}>
            <div>
              <Tooltip
                title={isOneOfMyFavorites ? `Remove ${city.name} from favorites` : `Save ${city.name} as a favorite`}
              >
                <Button onClick={handleFavoriteToggled} size="large" color="primary">
                  <FavoriteIconHelper as={FavoriteIcon} />
                </Button>
              </Tooltip>
            </div>
          </Slide>
        </Row>
        {!miniature && (
          <Slide in timeout={500} direction={"up"}>
            <Row justifyContent={"center"}>
              <Typography className={"getterBottom"} variant={"h4"} color={"secondary"}>
                {weather.text}
              </Typography>
            </Row>
          </Slide>
        )}
      </CurrentWeatherHelper>
    )
  );
}

export default CurrentWeather;
