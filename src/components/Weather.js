import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import { getIsOneOfMyBookmark, getSelectedCityWeather } from "../redux/weather/weather.selectors";
import { addToMyBookmarks, removeFromMyBookmarks } from "../redux/weather/weather.actions";
import styled from "styled-components";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import IOSSwitch from "./IOSSwitch";
import { openSnackbar } from "../redux/ui/ui.actions";
import moment from "moment";
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
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
`;

const BottomSection = styled.div`
  text-align: center;
`;

export default function Weather() {
  const dispatch = useDispatch();
  const selectedCityCurrentWeather = useSelector(getSelectedCityWeather());
  const isOneOfMyBookmarks = useSelector(getIsOneOfMyBookmark(selectedCityCurrentWeather && selectedCityCurrentWeather["key"]));
  if (!selectedCityCurrentWeather) {
    return <div>Must provide a city!</div>;
  }

  const {
    WeatherIcon: iconId,
    WeatherText: text,
    EpochTime: epochTime,
    Temperature: {
      Imperial: { Value: imperial },
      Metric: { Value: metric }
    }, name, key
  } = selectedCityCurrentWeather;

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
  const temp = isFahrenheit ? imperial : metric;
  const utc = moment.utc(epochTime).local();
  return (
    <StyledCard className={"weather"}>
      <CardContent>
        <TopSection>
          <img alt={text} height={96} src={`https://developer.accuweather.com/sites/default/files/${iconId}-s.png`} />
          <div>
            <Typography gutterBottom variant="h5" component="h5">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h6">
              {temp} °{isFahrenheit ? "F" : "C"}
            </Typography>
          </div>
        </TopSection>
        <BottomSection>
          <Typography gutterBottom variant="h3" component="h3">
            {text}
          </Typography>
        </BottomSection>
      </CardContent>
      <CardActions>
        <Button onClick={handleBookmarkToggled} size="large" color="primary">
          <BookmarkIcon />
        </Button>
        <IOSSwitch />
      </CardActions>
    </StyledCard>
  );
}
