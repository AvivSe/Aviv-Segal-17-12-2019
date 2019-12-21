import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import { getIsFahrenheit, getIsOneOfMyFavorite, getIsPending } from "../redux/weather/weather.selectors";
import { addToMyFavorites, removeFromMyFavorites } from "../redux/weather/weather.actions";
import styled from "styled-components";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { openSnackbar } from "../redux/ui/ui.actions";
import Tooltip from "./standalone/Tooltip";
import { iconMap } from "./standalone/AccuWeatherIcons";
import Grow from "@material-ui/core/Grow";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

const StyledCard = styled(Card)`
  margin: 0.5rem;
  .MuiCardMedia-root {
    height: 240px;
  }

  .mainSvg {
    height: 50vh;
    margin: auto;
  }

  width: 100%;

  background-color: rgba(0, 0, 0, 0.04); // TODO: Blur
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
`;

const BottomSection = styled.div`
  text-align: center;
`;
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  padding-inline-end: 2rem;
`;

const StyledMainIcon = styled.svg`
  width: 7rem;
  height: unset;
  margin-inline-end: 2.5rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 3rem;
    margin-inline-end: 0.5rem;
  }
`;

const ResponsiveText = styled.div`
  font-size: ${({ fontSize = 2 }) => `${fontSize}rem`};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: ${({ fontSize = 2 }) => `${fontSize / 1.5}rem`};
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    font-size: ${({ fontSize = 2 }) => `${fontSize / 2}rem`};
  }
`;

const StyledDailyIcon = styled.svg`
  max-width: 5rem;
  height: unset;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 4rem;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    max-width: 40px;
  }
`;

const DailyForecasts = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 50rem;
  margin: auto;
  margin-block-start: 2rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-block-start: 0.5rem;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    margin-block-start: 0.2rem;
  }
  > * {
    display: flex;
    flex-direction: column;
    margin-inline-end: 0.1rem;
    padding: 0.5rem 0;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 1rem;
    align-items: center;
    min-width: 10rem;

    ${({ theme }) => theme.breakpoints.down("md")} {
      min-width: 9.5rem;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
      min-width: 6.5rem;
    }

    ${({ theme }) => theme.breakpoints.down("xs")} {
      min-width: 3rem;
    }

    .dailyTime {
      background-color: rgba(0, 0, 0, 0.05);
      width: 100%;
      text-align: center;
      margin: 0.5rem 0;
    }
  }
`;

const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const toCelsius = fahrenheit => ((5 / 9) * (fahrenheit - 32)).toFixed(1);

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

  function renderDailyForecasts() {
    return dailyForecasts.map(function(
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
    });
  }

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
              <Slide in timeout={500} direction={"right"}>
                <div>
                  <StyledMainIcon as={MainIcon} />
                </div>
              </Slide>
              <div>
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
              <DailyForecasts>{renderDailyForecasts()}</DailyForecasts>
            </Fade>
          </CardContent>
          <StyledCardActions>
            <Slide direction={"right"} in timeout={750}>
              <div>
                <Tooltip title={isOneOfMyFavorites ? `Remove ${name} from favorites` : `Save ${name} as a favorite`}>
                  <Button onClick={handleFavoriteToggled} size="large" color="primary">
                    <FavoriteIcon />
                  </Button>
                </Tooltip>
              </div>
            </Slide>
            <Slide direction={"up"} in timeout={750}>
              <div>
                <Tooltip title={date.toString()} aria-label="full date time">
                  <div>
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
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
