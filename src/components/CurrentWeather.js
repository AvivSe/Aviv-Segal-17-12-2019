import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { getIsFahrenheit, getIsOneOfMyFavorite } from "../redux/weather/weather.selectors";
import { addToFavorites, addToHistory, removeFromFavorites } from "../redux/weather/weather.actions";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { openSnackbar } from "../redux/ui/ui.actions";
import weatherService from "../AccuWeatherService";
import Tooltip from "./standalone/Tooltip";
import { iconMap } from "./standalone/AccuWeatherIcons";
import Slide from "@material-ui/core/Slide";
import { Column, CurrentWeatherHelper, ResponsiveText, Row, StyledMainIcon } from "./styled";

export function CurrentWeather({ city, miniature }) {
  const dispatch = useDispatch();
  const [weather, setWeather] = useState(null);

  const isFahrenheit = useSelector(getIsFahrenheit);

  useEffect(
    function() {
      if (!!city) {
        (async function() {
          try {
            setWeather(await weatherService.fetchCurrentWeather(city));
            dispatch(addToHistory(city));
          } catch (e) {
            dispatch(openSnackbar(e.message));
          }
        })();
      }
    },
    [dispatch, city]
  );

  const isOneOfMyFavorites = useSelector(getIsOneOfMyFavorite(city));
  const FavoriteIcon = isOneOfMyFavorites ? Favorite : FavoriteBorder;

  function handleFavoriteToggled() {
    if (isOneOfMyFavorites) {
      dispatch(removeFromFavorites(city.key));
      dispatch(openSnackbar(`${city.name} removed from favorites, todo undo.`));
    } else {
      dispatch(addToFavorites(city.key));
      dispatch(openSnackbar(`${city.name} added to your favorites`));
    }
  }
  const date = !!weather && new Date(weather.localObservationDateTime);

  return (
    !!weather && !!city && (
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
                <Typography variant="h6">{city.name}</Typography>
              </Slide>
              <Slide in timeout={500} direction={"down"}>
                <div>
                  <Tooltip
                    title={`${!isFahrenheit ? weather.imperial : weather.metric} °${isFahrenheit ? "F" : "c"}`}
                    aria-label="celsius / fahrenheit"
                  >
                    <Typography variant="h5">
                      {isFahrenheit ? weather.imperial : weather.metric}° {isFahrenheit ? "F" : "c"}
                    </Typography>
                  </Tooltip>
                </div>
              </Slide>
              <Typography variant="body2" color="textSecondary">
                {date.toLocaleTimeString()}
              </Typography>
            </Column>
          </Row>
          <Slide direction={"left"} in timeout={500}>
            <div>
              <Tooltip
                title={isOneOfMyFavorites ? `Remove ${city.name} from favorites` : `Save ${city.name} as a favorite`}
              >
                <Button onClick={handleFavoriteToggled} size="large" color="primary">
                  <FavoriteIcon />
                </Button>
              </Tooltip>
            </div>
          </Slide>
        </Row>
        {!miniature && (
          <Slide in timeout={500} direction={"up"}>
            <Row justifyContent={"center"} style={{ marginTop: "1rem" }}>
              <ResponsiveText fontSize={2.1}>{weather.text}</ResponsiveText>
            </Row>
          </Slide>
        )}
      </CurrentWeatherHelper>
    )
  );
}

export default CurrentWeather;
