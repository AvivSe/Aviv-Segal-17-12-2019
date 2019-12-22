import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import CurrentWeather from "./CurrentWeather";
import Zoom from "@material-ui/core/Zoom";
import {Favorite} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import {addToFavorites} from "../redux/weather/weather.actions";
import {getFavoriteCities, getIsOneOfMyFavorite, getSelectedCity} from "../redux/weather/weather.selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  justify-content: center;
  > * {
    margin: 0.5rem;
  }
`;

export default function Favorites() {
  const dispatch = useDispatch();
  const city = useSelector(getSelectedCity);
  const favoriteCities = useSelector(getFavoriteCities);
  const isSelectedCityFavorite = useSelector(getIsOneOfMyFavorite(city));
  function handleAddSelectedAsFavorite() {
    dispatch(addToFavorites(city.key));
  }
  const showAddCity = city && !isSelectedCityFavorite;
  return (
    <div className={"mainContent"}>
      <Zoom in timeout={1500}>
        <Flex>
          <div>
            <Grid container>
              {favoriteCities.map(city => {
                return <CurrentWeather key={city.key} miniature city={city} />;
              })}
            </Grid>
          </div>
          {showAddCity && (
            <Flex>
              <Fab onClick={handleAddSelectedAsFavorite} color="primary">
                <Favorite />
              </Fab>
              <Typography variant={"body2"} color={"secondary"}>
                Add {city.name} as your first favorite!
              </Typography>
            </Flex>
          )}
        </Flex>
      </Zoom>
    </div>
  );
}
