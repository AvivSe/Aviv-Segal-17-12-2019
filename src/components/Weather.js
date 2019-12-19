import React, {useEffect} from "react";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentWeather, getIsOneOfMyBookmark} from "../redux/weather/weather.selectors";
import {addToMyBookmarks, fetchCurrentWeather, removeFromMyBookmarks} from "../redux/weather/weather.actions";
import styled from "styled-components";
import {Bookmark, BookmarkBorder} from "@material-ui/icons";

const StyledCard = styled(Card)`
  margin: 0.5rem;
  .MuiCardMedia-root {
    height: 240px;
  }
  
  .mainSvg {
     height: 50vh;
     margin:auto;
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


export default function Weather({city: {name, key}}) {
  const dispatch = useDispatch();
  const currentWeather = useSelector(getCurrentWeather(key));

  const isFahrenheit = false;
  const isOneOfMyBookmarks = useSelector(getIsOneOfMyBookmark(key));
  const BookmarkIcon = isOneOfMyBookmarks ? Bookmark : BookmarkBorder;

  useEffect(() => {
    dispatch(fetchCurrentWeather(key));
  }, [dispatch, key]);

  if (!currentWeather) {
    return <div>Must provide a city!</div>
  }

  function handleBookmarkToggled() {
    if (isOneOfMyBookmarks) {
      dispatch(removeFromMyBookmarks({name, key}));
    } else {
      dispatch(addToMyBookmarks({name, key}));
    }
  }

  const {WeatherIcon: iconId, WeatherText: text, Temperature: {Imperial: {Value: imperial}, Metric: {Value: metric}}} = currentWeather;
  const temp = isFahrenheit ? imperial : metric;
  return (
    <StyledCard className={"weather"}>
        <CardContent>
          <TopSection>
            <img alt={text} height={96} src={`https://developer.accuweather.com/sites/default/files/${iconId}-s.png`}/>
            <div>
              <Typography gutterBottom variant="h5" component="h5">
                {name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h6">
                {temp} °{isFahrenheit ? 'F' : 'C'}
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
          <BookmarkIcon/>
        </Button>
      </CardActions>
    </StyledCard>
  );
}
