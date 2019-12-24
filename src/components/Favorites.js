import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeather from "./CurrentWeather";
import Zoom from "@material-ui/core/Zoom";
import { Add } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { addToFavorites, setSelectedCity } from "../redux/weather/weather.actions";
import { getFavoriteCities, getSelectedCity } from "../redux/weather/weather.selectors";
import Typography from "@material-ui/core/Typography";
import { ColumnCentered } from "./styled";
import useNavigator from "../hooks/useNavigator";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  > * {
    margin: 0.5rem;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  width: 298px;
  height: 150px;
  margin-bottom: -167px;
  border-radius: 1rem;
`;

const Favorite = styled.div`
  margin: 0.3rem;
`;

export default function Favorites() {
  const dispatch = useDispatch();
  const city = useSelector(getSelectedCity);
  const favoriteCities = useSelector(getFavoriteCities);
  const [, navigate] = useNavigator();
  function handleAddSelectedAsFavorite() {
    dispatch(addToFavorites(city.key));
  }

  const showAddCity = city && favoriteCities.length === 0;
  return (
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
                <Favorite key={city.key}>
                  <StyledButton onClick={handleSearchAgain}>
                    <div />
                  </StyledButton>
                  <CurrentWeather miniature city={city} />
                </Favorite>
              );
            })}
          </Flex>
          {showAddCity && (
            <ColumnCentered>
              <Fab onClick={handleAddSelectedAsFavorite} color="primary">
                <Add />
              </Fab>
              <Typography variant={"body2"} color={"secondary"}>
                Add {city.name} as your first favorite!
              </Typography>
            </ColumnCentered>
          )}
        </Container>
      </Zoom>
    </div>
  );
}
