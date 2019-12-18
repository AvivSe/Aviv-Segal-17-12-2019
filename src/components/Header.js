import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import useNavigator from "../hooks/useNavigator";
import { pathMap, pathNames } from "../configurations/routes";
import { Brightness7 as DarkMode, Brightness4 as LightMode } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getIsDarkMode } from "../redux/ui/ui.selectors";
import { toggleDarkTheme } from "../redux/ui/ui.actions";
import Tooltip from "@material-ui/core/Tooltip";

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
`;

const StyledIconButton = styled(IconButton)`
  background-color: ${({ theme, selected }) => (selected ? theme.palette.primary.dark : null)} !important;
`;

const UpperNavigation = styled.div`
  display: block;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;

function Header() {
  const [path, navigate] = useNavigator();
  const isDarkMode = useSelector(getIsDarkMode);
  const dispatch = useDispatch();
  const ToggleDarkModeIcon = isDarkMode ? DarkMode : LightMode;

  const handleMenuItemClick = path => {
    navigate(path);
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkTheme());
  };

  return (
    <AppBar position="static">
      <StyledToolBar>
        <div>
          <Typography variant="h6" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Herolo Weather Task
          </Typography>
        </div>
        <Row>
          <UpperNavigation>
            {pathNames.map(pathName => {
              const { label, Icon } = pathMap[pathName];
              return (
                <Tooltip key={label} title={label} aria-label={label.toLowerCase()}>
                  <StyledIconButton
                    color="inherit"
                    selected={pathName === path}
                    value={pathName}
                    onClick={() => handleMenuItemClick(pathName)}
                  >
                    <Icon />
                  </StyledIconButton>
                </Tooltip>
              );
            })}
          </UpperNavigation>
          {
            <Tooltip title={`Toggle Dark Mode ${isDarkMode ? "Off" : "On"}`} aria-label={"toggle dark mode on / off"}>
              <IconButton color="inherit" onClick={handleDarkModeToggle}>
                <ToggleDarkModeIcon/>
              </IconButton>
            </Tooltip>
          }
        </Row>
      </StyledToolBar>
    </AppBar>
  );
}

export default Header;
