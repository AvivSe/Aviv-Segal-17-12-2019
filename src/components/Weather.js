import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import { getIsOneOfMyBookmark, getIsPending } from "../redux/weather/weather.selectors";
import { addToMyBookmarks, removeFromMyBookmarks } from "../redux/weather/weather.actions";
import styled from "styled-components";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { openSnackbar } from "../redux/ui/ui.actions";
import Tooltip from "./Tooltip";
import { iconMap } from "./AccuWeatherIcons";
import Grow from "@material-ui/core/Grow";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";

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
  
  background-color: rgba(0,0,0,.04); // TODO: Blur
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
`;

const ResponsiveText = styled.div`
  font-size: ${({ fontSize = 2 }) => `${fontSize}rem`};
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: ${({ fontSize = 2 }) => `${fontSize/1.5}rem`};
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    font-size: ${({ fontSize = 2 }) => `${fontSize/2}rem`};
  }
`;

const StyledDivider = styled(Divider)`
  margin: 1rem 0;
`;

const StyledDailyIcon = styled.svg`
  max-width: 5rem;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 4rem;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    max-width: 40px;
  }
  
  height: unset;
  margin-inline-end: 2.5rem;
`;

const DailyForecasts = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 50rem;
  margin: auto; 
  margin-block-start: 2rem;
  
  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-block-start: .5rem;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    margin-block-start: .2rem;
  }
  > * {
    min-width: 50px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    margin: .2rem;
    background-color: rgba(0,0,0,.05);
    padding: .75rem;
    border-radius: 1rem;
  }
`;


export function Weather({ weather, miniature }) {
  const dispatch = useDispatch();
  const isOneOfMyBookmarks = useSelector(getIsOneOfMyBookmark(weather && weather["key"]));
  const isPending = useSelector(getIsPending);

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
        Date,
        Temperature: {
          Minimum: { Value: minimumFahrenheit },
          Maximum: { Value: maximumFahrenheit }
        },
        Day: { Icon: dayTimeIcon, IconPhrase: dayTimeText },
        Night: { Icon: nightTimeIcon, IconPhrase: nightTimeText }
      },
      i
    ) {
      return (
        <Grow key={`${i}_${date}`} in timeout={750*(i+1)}>
        <div>
          <div>Temp: {maximumFahrenheit} to {maximumFahrenheit}</div>
          <div>Day - {dayTimeText}</div>
          <StyledDailyIcon as={iconMap[dayTimeIcon]}/>
          <StyledDivider/>
          <div>Night - {nightTimeText}</div>
          <StyledDailyIcon as={iconMap[nightTimeIcon]}/>
        </div>
        </Grow>
      );
    });
  }

  const isFahrenheit = false;
  const BookmarkIcon = isOneOfMyBookmarks ? Bookmark : BookmarkBorder;

  function handleBookmarkToggled() {
    if (isOneOfMyBookmarks) {
      dispatch(removeFromMyBookmarks(key));
      dispatch(openSnackbar(`${name} removed from bookmarks, todo undo.`));
    } else {
      dispatch(addToMyBookmarks(key));
      dispatch(openSnackbar(`${name} added to your bookmarks`));
    }
  }
  const date = new Date(localObservationDateTime);
  const MainIcon = iconMap[iconId];
  return (
    <>
      {isPending && <div>Loading....</div>}
      {!isPending && !!weather.uniqId && (
        <StyledCard className={"weather"}>
          <CardContent>
            <TopSection>
              <StyledMainIcon as={MainIcon} />
              <div>
                <ResponsiveText fontSize={2}>
                  {name}
                </ResponsiveText>
                <Tooltip
                  title={`${!isFahrenheit ? imperial : metric} °${!isFahrenheit ? "F" : "C"}`}
                  aria-label="celsius / fahrenheit"
                >
                  <Typography gutterBottom variant="h6" component="h6">
                    {isFahrenheit ? imperial : metric} °{isFahrenheit ? "F" : "C"}
                  </Typography>
                </Tooltip>
              </div>
            </TopSection>
            <BottomSection>
              <ResponsiveText fontSize={3}>
                {text}
              </ResponsiveText>
              <ResponsiveText fontSize={1.5}>
                {headlineText}
              </ResponsiveText>
            </BottomSection>
            <Fade in>
            <DailyForecasts>
              {renderDailyForecasts()}
            </DailyForecasts>
            </Fade>
          </CardContent>
          <StyledCardActions>
            <Tooltip title={isOneOfMyBookmarks ? `Remove ${name} from bookmarks` : `Save ${name} as a bookmark`}>
              <Button onClick={handleBookmarkToggled} size="large" color="primary">
                <BookmarkIcon />
              </Button>
            </Tooltip>
            <Tooltip title={date.toString()} aria-label="full date time">
              <div>
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
              </div>
            </Tooltip>
          </StyledCardActions>
        </StyledCard>
      )}
    </>
  );
}

export default Weather;
