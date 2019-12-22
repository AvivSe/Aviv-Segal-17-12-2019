import React, {useEffect} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeather from "./CurrentWeather";
import Zoom from "@material-ui/core/Zoom";
import { Add } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { addToFavorites } from "../redux/weather/weather.actions";
import {getFavoriteCities, getSelectedCity} from "../redux/weather/weather.selectors";
import Grid from "@material-ui/core/Grid";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 320px;
  justify-content: center;
`;

const FirstFavorite = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
`;

export default function Favorites() {
  const dispatch = useDispatch();
  const city = useSelector(getSelectedCity);
  const favoriteCities = useSelector(getFavoriteCities);
  console.log(favoriteCities);
  
  function handleAddSelectedAsFavorite() {
    dispatch(addToFavorites(city.key));
  }

  return (
    <div className={"mainContent"}>
      <Zoom in timeout={1500}>
        <Flex>
          <div>
            {city && favoriteCities.length === 0 && (
              <Flex>
                <Fab onClick={handleAddSelectedAsFavorite} color="primary" aria-label="add">
                  <Add />
                </Fab>
                <FirstFavorite>Add {city.name} as your first favorite!</FirstFavorite>
              </Flex>
            )}
            <Grid container>
              {favoriteCities.map(city => {
                return <CurrentWeather miniature city={city} />;
              })}
            </Grid>
          </div>
        </Flex>
      </Zoom>
    </div>
  );
}
