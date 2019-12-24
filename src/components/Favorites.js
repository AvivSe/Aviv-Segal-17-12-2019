import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CurrentWeather from "./CurrentWeather";
import Zoom from "@material-ui/core/Zoom";
import { Add, ArrowBack } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { addToFavorites, setSelectedCity } from "../redux/weather/weather.actions";
import { getFavoriteCities, getIsOneOfMyFavorite, getSelectedCity } from "../redux/weather/weather.selectors";
import Typography from "@material-ui/core/Typography";
import { ColumnCentered, IconHelper } from "./styled";
import Slide from "@material-ui/core/Slide";
import useNavigator from "../hooks/useNavigator";
import { specialColors as specialColor } from "../configurations/theme";
import Button from "@material-ui/core/Button";

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
  width: 280px;
  height: 150px;
  margin-bottom: -150px;
`;


const StyledBackFab = styled(Fab)`
  background-color: ${({ theme: { type, palette } }) =>
    type === "dark" ? specialColor.attention : palette.primary.main};
  position: fixed;
  bottom: 2rem;
  left: 2rem;
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
                  <div key={city.key}>
                    <StyledButton onClick={handleSearchAgain}><div/></StyledButton>
                    <CurrentWeather miniature city={city} />
                  </div>
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
      <Slide in direction={"right"}>
        <StyledBackFab onClick={() => navigate("/")} color="primary">
          <IconHelper as={ArrowBack} color={"primary"} />
        </StyledBackFab>
      </Slide>
    </>
  );
}
