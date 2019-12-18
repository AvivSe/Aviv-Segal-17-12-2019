import React, { useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import {getCurrentWeather, getIsOneOfMyBookmark} from "../redux/weather/weather.selectors";
import {addToMyBookmarks, fetchCurrentWeather, removeFromMyBookmarks} from "../redux/weather/weather.actions";
import styled from "styled-components";
import { BookmarkBorder, Bookmark } from "@material-ui/icons";

const StyledCard = styled(Card)`
  margin: 0.5rem;
  .MuiCardMedia-root {
    height: 240px;
  }
`;

export default function Weather({ city: { name, key } }) {
  const dispatch = useDispatch();
  const currentWeather = useSelector(getCurrentWeather(key));

  const isOneOfMyBookmarks = useSelector(getIsOneOfMyBookmark(key));
  const BookmarkIcon = isOneOfMyBookmarks ? Bookmark : BookmarkBorder;

  useEffect(() => {
    dispatch(fetchCurrentWeather(key));
  }, [dispatch, key]);

  function handleBookmarkToggled() {
    if(isOneOfMyBookmarks) {
      dispatch(removeFromMyBookmarks({name, key}));
    } else {
      dispatch(addToMyBookmarks({name, key}));
    }
  }

  return (
    <StyledCard className={"weather"}>
      <CardActionArea>
        <CardMedia
          image="http://cdn.taboola.com/libtrc/static/thumbnails/103a47baec9e704e04df27fe07e5c588.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Showing data on {name} key: {key}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {JSON.stringify(currentWeather)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary">
          <BookmarkIcon onClick={handleBookmarkToggled}/>
        </Button>
      </CardActions>
    </StyledCard>
  );
}
