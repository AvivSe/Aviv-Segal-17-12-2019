import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import useNavigator from "../hooks/useNavigator";
import { pathMap, pathNames, pathnameToIcon } from "../configurations/routes";
import { Brightness4 as LightMode, Brightness7 as DarkMode, GitHub, Settings } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { getDialog, getIsDarkMode } from "../redux/ui/ui.selectors";
import { closeDialog, openDialog, toggleDarkTheme } from "../redux/ui/ui.actions";
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

  border-inline-end: 1px solid rgba(0, 0, 0, 0.16);
  padding-inline-end: 0.5rem;
`;

function Header() {
  const [currentPathname, navigate] = useNavigator();
  const isDarkMode = useSelector(getIsDarkMode);
  const { component: dialogContent } = useSelector(getDialog);
  const dispatch = useDispatch();

  const ToggleDarkModeIcon = isDarkMode ? DarkMode : LightMode;
  const handleMenuItemClick = path => {
    navigate(path);
  };

  function handleDarkModeToggle() {
    dispatch(toggleDarkTheme());
  }

  function handleSettingsToggle() {
    dispatch(!!dialogContent ? closeDialog() : openDialog("moreSettings"));
  }

  return (
    <AppBar position="static">
      <StyledToolBar>
        <Typography variant="h6" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Weather
        </Typography>
        <Row>
          <UpperNavigation>
            {pathNames.map(pathname => {
              const { label } = pathMap[pathname];
              const icon = pathnameToIcon[pathname];
              const Icon = currentPathname === pathname ? icon.selected : icon.default;
              return (
                <Tooltip key={label} title={label} aria-label={label.toLowerCase()}>
                  <StyledIconButton
                    color="inherit"
                    selected={pathname === currentPathname}
                    value={pathname}
                    onClick={() => handleMenuItemClick(pathname)}
                  >
                    <Icon />
                  </StyledIconButton>
                </Tooltip>
              );
            })}
          </UpperNavigation>
          <Tooltip title={`Toggle Dark Mode ${isDarkMode ? "Off" : "On"}`} aria-label="toggle dark mode on / off">
            <IconButton color="inherit" onClick={handleDarkModeToggle}>
              <ToggleDarkModeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More settings" aria-label="toggle dark mode on / off">
            <IconButton color="inherit" onClick={handleSettingsToggle}>
              <Settings />
            </IconButton>
          </Tooltip>
        </Row>
      </StyledToolBar>
    </AppBar>
  );
}

export default Header;
