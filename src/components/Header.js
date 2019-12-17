import React, {useEffect, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme, selected }) => (selected ? theme.palette.primary.dark : null)} !important;
`;
function Header() {
  const [selected, setSelected] = useState("Home");
  const history = useHistory();

  const handleHomeButtonClick = () => {
    setSelected('home');
    history.push('/');
  };

  const handleFavoritesButtonClick = () => {
    setSelected('favorites');
    history.push('/favorites');
  };
  return (
    <AppBar position="static">
      <StyledToolBar>
        <Typography variant="h6">Weather.</Typography>
        <div>
          <StyledButton
            color="inherit"
            selected={'home' === selected}
            onClick={handleHomeButtonClick}
          >
            Home
          </StyledButton>
          <StyledButton
            color="inherit"
            selected={'favorites' === selected}
            onClick={handleFavoritesButtonClick}
          >
            Favorites
          </StyledButton>
        </div>
      </StyledToolBar>
    </AppBar>
  );
}

export default Header;
