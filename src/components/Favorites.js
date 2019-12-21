import React, {useEffect} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {openSnackbar} from "../redux/ui/ui.actions";
import Weather from "./Weather";
import Zoom from "@material-ui/core/Zoom";
import {Add} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import {addToMyFavorites} from "../redux/weather/weather.actions";
import {getFavoritesAsWeather, getSelectedCity} from "../redux/weather/weather.selectors";

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
  const selectedCity = useSelector(getSelectedCity);
  const favorites = useSelector(getFavoritesAsWeather);

  const noFavorites = !favorites || favorites.length === 0;

  useEffect(
    function() {
      if (noFavorites) {
        dispatch(openSnackbar(`No favorites found`));
      }
    },
    [dispatch, noFavorites]
  );

  function handleAddSelectedAsFavorite() {
    dispatch(addToMyFavorites(selectedCity.key));
  }
  return (
    <div className={"mainContent"}>
      <Zoom in timeout={1500}>
        <Flex>
          <div>
            {favorites.length === 0 && (
              <Flex>
                <Fab onClick={handleAddSelectedAsFavorite} color="primary" aria-label="add">
                  <Add />
                </Fab>
                <FirstFavorite>Add {selectedCity.name} as your first favorite!</FirstFavorite>
              </Flex>
            )}
            {favorites.map(weather => {
              console.log(weather);
              return (<Weather key={weather.name} weather={weather} />);
            })}
          </div>
        </Flex>
      </Zoom>
    </div>
  );
}
