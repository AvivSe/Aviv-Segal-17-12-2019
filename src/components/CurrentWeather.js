import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getIsFahrenheit, getIsOneOfMyFavorite } from "../redux/weather/weather.selectors";
import {
  addToFavorites,
  addToHistory,
  removeFromFavorites,
  setNotPending,
  setOnPending
} from "../redux/weather/weather.actions";
import { DeleteOutlineOutlined, Favorite, FavoriteBorder, Check, Sync } from "@material-ui/icons";
import { openSnackbar } from "../redux/ui/ui.actions";
import weatherService from "../AccuWeatherService";
import Tooltip from "./standalone/Tooltip";
import { iconMap } from "./standalone/AccuWeatherIcons";
import Slide from "@material-ui/core/Slide";
import { Column, CurrentWeatherHelper, FavoriteIconHelper, Row, StyledMainIcon } from "./styled";
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
  const [showRefreshSuccessIcon, setShowRefreshSuccessIcon] = useState(false);

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
      await new Promise(resolve => setTimeout(resolve,750));
      setWeather(await weatherService.fetchCurrentWeather(city));
      setShowRefreshSuccessIcon(true);
      setTimeout(function () {
        setShowRefreshSuccessIcon(false)
      }, 3000)
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
      //dispatch(openSnackbar(`${city.name} added to your favorites`));
      navigate("/favorites");
    }
  }

  const date = !!weather && new Date(weather.localObservationDateTime);

  return (
    !!weather &&
    !!city && (
      <CurrentWeatherHelper miniature={miniature}>
        <Row justifyContent={"space-between"}>
          <Column>
            <Slide in timeout={750} unmountOnExit direction={"down"}>
              <Row>
                <Typography variant="h5" color={"secondary"}>
                  {city.name}, {city.countryName}
                </Typography>
              </Row>
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
                <Tooltip title={`Updated to: ${date.toLocaleString()}`}>
                  <Typography variant="body2" color={"secondary"}>
                    <span>{date.toLocaleTimeString()}</span>
                  </Typography>
                </Tooltip>
                {!miniature && (
                  <Tooltip title={`Check for new data`}>
                    <Typography variant="body2" color={"secondary"}>
                      <span>
                        {!showRefreshSuccessIcon && <IconButton onClick={handleRefresh} color={"secondary"}>
                          <Sync className={isScopedPending ? "circularAnimation" : null} />
                        </IconButton>}
                        {showRefreshSuccessIcon && <IconButton><Check color={"secondary"}/></IconButton>}
                      </span>
                    </Typography>
                  </Tooltip>
                )}
              </Row>
            </Slide>
          </Column>
          <Slide unmountOnExit in timeout={500} direction={"down"}>
            <div>
              <Tooltip title={weather.text}>
                <StyledMainIcon as={iconMap[weather.iconId]} miniature={miniature} />
              </Tooltip>
            </div>
          </Slide>
          <Slide direction={"left"} in timeout={500}>
            <div>
              <Tooltip
                title={isOneOfMyFavorites ? `Remove ${city.name} from favorites` : `Save ${city.name} as a favorite`}
              >
                <Button onClick={handleFavoriteToggled} size="large" color="primary">
                  <FavoriteIconHelper as={miniature && isOneOfMyFavorites ? DeleteOutlineOutlined : FavoriteIcon} />
                </Button>
              </Tooltip>
            </div>
          </Slide>
        </Row>
      </CurrentWeatherHelper>
    )
  );
}

export default CurrentWeather;
