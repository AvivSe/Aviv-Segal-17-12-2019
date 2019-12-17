import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Home, Bookmark } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme, selected }) => (selected ? theme.palette.primary.dark : null)} !important;
`;

const StyledIconButton = styled(IconButton)`
  background-color: ${({ theme, selected }) => (selected ? theme.palette.primary.dark : null)} !important; }
`;
function Header({ width }) {
  const [selected, setSelected] = useState("home");
  const history = useHistory();
  const isNarrowScreen = isWidthDown("sm", width);
  const isHomeSelected = "home" === selected;
  const isFavoritesSelected = !!selected && "favorites" === selected;

  const handleHomeButtonClick = () => {
    setSelected("home");
    history.push("/");
  };

  const handleFavoritesButtonClick = () => {
    setSelected("favorites");
    history.push("/favorites");
  };
  return (
    <AppBar position="static">
      <StyledToolBar>
        <Typography variant="h6">Weather.</Typography>
        <div>
          {isNarrowScreen && (
            <>
              <StyledIconButton
                aria-label="Home Page"
                color="inherit"
                selected={isHomeSelected}
                onClick={handleHomeButtonClick}
              >
                <Home />
              </StyledIconButton>
              <StyledIconButton
                aria-label="Favorites"
                color="inherit"
                selected={isFavoritesSelected}
                onClick={handleFavoritesButtonClick}
              >
                <Bookmark />
              </StyledIconButton>
            </>
          )}
          {!isNarrowScreen && (
            <>
              <StyledButton color="inherit" selected={isHomeSelected} onClick={handleHomeButtonClick}>
                Home
              </StyledButton>
              <StyledButton color="inherit" selected={isFavoritesSelected} onClick={handleFavoritesButtonClick}>
                Favorites
              </StyledButton>
            </>
          )}
        </div>
      </StyledToolBar>
    </AppBar>
  );
}

export default withWidth()(Header);
