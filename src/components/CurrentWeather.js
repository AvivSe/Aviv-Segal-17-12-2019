import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getIsFahrenheit, getIsOneOfMyFavorite } from "../redux/weather/weather.selectors";
import { addToFavorites, addToHistory, removeFromFavorites, setSelectedCity } from "../redux/weather/weather.actions";
import { Favorite, Search, FavoriteBorder, Refresh } from "@material-ui/icons";
import { openSnackbar, setNotPending, setOnPending } from "../redux/ui/ui.actions";
import weatherService from "../AccuWeatherService";
import Tooltip from "./standalone/Tooltip";
import { iconMap } from "./standalone/AccuWeatherIcons";
import Slide from "@material-ui/core/Slide";
import { Column, CurrentWeatherHelper, FavoriteIconHelper, Row, SearchIconHelper, StyledMainIcon } from "./styled";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import useNavigator from "../hooks/useNavigator";

export function CurrentWeather({ city, miniature }) {
  const requestId = `${city.name}, ${new Date().toLocaleString()}`;
  const dispatch = useDispatch();
  const [weather, setWeather] = useState(null);
  const [, navigate] = useNavigator();
  const isFahrenheit = useSelector(getIsFahrenheit);
  const [isScopedPending, setIsScopedPending] = useState(false);

  useEffect(
    function() {
      if (!!city) {
        (async function() {
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
    [dispatch, city, requestId]
  );

  const isOneOfMyFavorites = useSelector(getIsOneOfMyFavorite(city));
  const FavoriteIcon = isOneOfMyFavorites ? Favorite : FavoriteBorder;

  async function handleRefresh() {
    try {
      setIsScopedPending(true);
      setWeather(await weatherService.fetchCurrentWeather(city));
    } catch (e) {
      dispatch(openSnackbar("failed refresh data"));
    } finally {
      setIsScopedPending(false);
    }
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

  function handleSearchAgain() {
    dispatch(setSelectedCity(weather.cityKey));
    navigate("/");
  }

  const date = !!weather && new Date(weather.localObservationDateTime);

  return (
    !!weather &&
    !!city && (
      <CurrentWeatherHelper miniature={miniature}>
        <Row justifyContent={"space-between"}>
          <Row>
            <Slide in timeout={500} direction={"right"}>
              <div>
                <StyledMainIcon as={iconMap[weather.iconId]} />
              </div>
            </Slide>
            <Column>
              <Slide in timeout={750} unmountOnExit direction={"down"}>
                <Typography variant="h5" color={"secondary"}>
                  {city.name}, {city.countryName}
                </Typography>
              </Slide>
              <Slide in timeout={500} unmountOnExit direction={"down"}>
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
              <Slide in timeout={750} unmountOnExit direction={"right"}>
                <Row alignItems={"center"}>
                  <Tooltip title={`Recently updated: ${date.toLocaleString()}`}>
                    <Typography variant="body2" color={"secondary"}>
                      <span>{date.toLocaleTimeString()}</span>
                    </Typography>
                  </Tooltip>
                  {!miniature && (
                    <Tooltip title={`Recently updated: ${date.toLocaleString()}`}>
                      <Typography variant="body2" color={"secondary"}>
                        <span>
                          <IconButton onClick={handleRefresh} color={"secondary"}>
                            <Refresh className={isScopedPending ? "circularAnimation" : null} />
                          </IconButton>
                        </span>
                      </Typography>
                    </Tooltip>
                  )}
                  {miniature && (
                    <Tooltip title={`Search again`}>
                      <Typography variant="body2" color={"secondary"}>
                        <span>
                          <IconButton onClick={handleSearchAgain} color={"primary"}>
                            <SearchIconHelper as={Search} />
                          </IconButton>
                        </span>
                      </Typography>
                    </Tooltip>
                  )}
                </Row>
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
          <Slide unmountOnExit in timeout={500} direction={"up"}>
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
