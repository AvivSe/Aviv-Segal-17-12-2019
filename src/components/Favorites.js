import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeather from "./CurrentWeather";
import Zoom from "@material-ui/core/Zoom";
import { Favorite, ArrowBack } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import {addToFavorites, setSelectedCity} from "../redux/weather/weather.actions";
import { getFavoriteCities, getIsOneOfMyFavorite, getSelectedCity } from "../redux/weather/weather.selectors";
import Typography from "@material-ui/core/Typography";
import {ColumnCentered, IconHelper} from "./styled";
import Button from "@material-ui/core/Button";
import Draggable from "react-draggable";
import Slide from "@material-ui/core/Slide";
import useNavigator from "../hooks/useNavigator";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > * {
    margin: 0.5rem;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  height: 150px;
  margin-bottom: -150px;
  width: 100%;
  cursor: grab;

  :active {
    cursor: grabbing;
  }
`;

const StyledBackFab = styled(Fab)`
  background-color: ${({ theme: { type, palette } }) => (type === "dark" ? "#ff374a" : palette.primary.main)};
  position: absolute;
  bottom: 4rem;
  left: 3rem;
`;

export default function Favorites() {
  const dispatch = useDispatch();
  const city = useSelector(getSelectedCity);
  const favoriteCities = useSelector(getFavoriteCities);
  const isSelectedCityFavorite = useSelector(getIsOneOfMyFavorite(city));
  const [, navigate] = useNavigator();
  function handleAddSelectedAsFavorite() {
    dispatch(addToFavorites(city.key));
  }

  const showAddCity = city && !isSelectedCityFavorite;
  return (
    <>
      <div className={"mainContent"}>
        <Zoom in timeout={250}>
          <Container>
            <Flex>
              {favoriteCities.map(city => {
                function handleSearchAgain() {
                  dispatch(setSelectedCity(city.key));
                  navigate("/");
                }

                return (
                  <Draggable key={city.key} handle=".handle">
                    <div className={"handle"}>
                      <StyledButton onClick={handleSearchAgain}>
                        <div />
                      </StyledButton>
                      <CurrentWeather miniature city={city} />
                    </div>
                  </Draggable>
                );
              })}
            </Flex>
            {showAddCity && (
              <ColumnCentered>
                <Fab onClick={handleAddSelectedAsFavorite} color="primary">
                  <Favorite />
                </Fab>
                <Typography variant={"body2"} color={"secondary"}>
                  Add {city.name} as your first favorite!
                </Typography>
              </ColumnCentered>
            )}
          </Container>
        </Zoom>
      </div>
      <Slide in direction={"right"}>
        <StyledBackFab onClick={handleAddSelectedAsFavorite} color="primary">
          <IconHelper as={ArrowBack} color={"primary"}  onClick={()=>navigate('/')} />
        </StyledBackFab>
      </Slide>
    </>
  );
}
