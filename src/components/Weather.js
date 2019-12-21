import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {getIsFahrenheit, getIsOneOfMyFavorite, getIsPending} from "../redux/weather/weather.selectors";
import {addToMyFavorites, removeFromMyFavorites} from "../redux/weather/weather.actions";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import {openSnackbar} from "../redux/ui/ui.actions";
import Tooltip from "./standalone/Tooltip";
import {iconMap} from "./standalone/AccuWeatherIcons";
import Grow from "@material-ui/core/Grow";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import {
  BottomSection,
  Column,
  ResponsiveText,
  Row,
  StyledCard,
  StyledCardActions,
  StyledMainIcon,
  TopSection
} from "./styled";
import FiveDaysOfDailyForecasts from "./5DaysOfDailyFrorecasts";

export function Weather({ weather, miniature }) {
  const dispatch = useDispatch();
  const isOneOfMyFavorites = useSelector(getIsOneOfMyFavorite(weather && weather["key"]));
  const isPending = useSelector(getIsPending);
  const isFahrenheit = useSelector(getIsFahrenheit);

  const {
    WeatherIcon: iconId,
    WeatherText: text,
    LocalObservationDateTime: localObservationDateTime,
    Temperature: {
      Imperial: { Value: imperial },
      Metric: { Value: metric }
    },
    Headline: { Text: headlineText },
    DailyForecasts: dailyForecasts,
    name,
    key
  } = weather;

  const FavoriteIcon = isOneOfMyFavorites ? Favorite : FavoriteBorder;

  function handleFavoriteToggled() {
    if (isOneOfMyFavorites) {
      dispatch(removeFromMyFavorites(key));
      dispatch(openSnackbar(`${name} removed from favorites, todo undo.`));
    } else {
      dispatch(addToMyFavorites(key));
      dispatch(openSnackbar(`${name} added to your favorites`));
    }
  }
  const date = new Date(localObservationDateTime);
  const MainIcon = iconMap[iconId];
  return (
    <>
      {isPending && <div>Loading....</div>}
      {!isPending && (
        <StyledCard className={"weather"}>
          <CardContent>
            <TopSection>
              <Row>
                <Slide in timeout={500} direction={"right"}>
                  <div>
                    <StyledMainIcon as={MainIcon} />
                  </div>
                </Slide>
                <Column>
                  <Slide in timeout={500} direction={"left"}>
                    <ResponsiveText fontSize={2}>{name}</ResponsiveText>
                  </Slide>
                  <Slide in timeout={500} direction={"down"}>
                    <div>
                      <Tooltip
                        title={`${!isFahrenheit ? imperial : metric} °${!isFahrenheit ? "F" : "C"}`}
                        aria-label="celsius / fahrenheit"
                      >
                        <Typography gutterBottom variant="h6" component="h6">
                          {isFahrenheit ? imperial : metric} °{isFahrenheit ? "F" : "C"}
                        </Typography>
                      </Tooltip>
                    </div>
                  </Slide>
                </Column>
              </Row>
              <div>
                <Slide direction={"right"} in timeout={750}>
                  <div>
                    <Tooltip
                      title={isOneOfMyFavorites ? `Remove ${name} from favorites` : `Save ${name} as a favorite`}
                    >
                      <Button onClick={handleFavoriteToggled} size="large" color="primary">
                        <FavoriteIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </Slide>
              </div>
            </TopSection>
            <BottomSection>
              <Grow in timeout={1000}>
                <ResponsiveText fontSize={3}>{text}</ResponsiveText>
              </Grow>
              <Grow in timeout={2000}>
                <ResponsiveText fontSize={1.5}>{headlineText}</ResponsiveText>
              </Grow>
            </BottomSection>
            <Fade in>
              <FiveDaysOfDailyForecasts/>
            </Fade>
          </CardContent>
          <StyledCardActions>
            <Slide direction={"up"} in timeout={750}>
              <div>
                <Tooltip title={date.toString()} aria-label="full date time">
                  <div>
                    {date.toLocaleDateString()}
                  </div>
                </Tooltip>
              </div>
            </Slide>
          </StyledCardActions>
        </StyledCard>
      )}
    </>
  );
}

export default Weather;
