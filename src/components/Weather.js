import React, { useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useDispatch, useSelector } from "react-redux";
import {getCurrentWeather, getIsOneOfMyFavorite, gwtMyFavorites} from "../redux/weather/weather.selectors";
import {addToMyFavorites, fetchCurrentWeather, removeFromMyFavorites} from "../redux/weather/weather.actions";
import styled from "styled-components";
import { FavoriteBorder, Favorite } from "@material-ui/icons";

const StyledCard = styled(Card)`
  margin: 0.5rem;
  .MuiCardMedia-root {
    height: 240px;
  }
`;

export default function Weather({ city: { name, key } }) {
  const dispatch = useDispatch();
  const currentWeather = useSelector(getCurrentWeather(key));

  const isOneOfMyFavorites = useSelector(getIsOneOfMyFavorite(key));
  const FavoriteIcon = isOneOfMyFavorites ? Favorite : FavoriteBorder;

  useEffect(() => {
    dispatch(fetchCurrentWeather(key));
  }, [dispatch, key]);

  function handleFavoriteToggled() {
    if(isOneOfMyFavorites) {
      dispatch(removeFromMyFavorites(key));
    } else {
      dispatch(addToMyFavorites(key))
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
        <Button size="small" color="primary">
          <FavoriteIcon onClick={handleFavoriteToggled}/>
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </StyledCard>
  );
}
