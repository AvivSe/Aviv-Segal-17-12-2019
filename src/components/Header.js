import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import useNavigator from "../hooks/useNavigator";
import {pathMap, pathNames, pathnameToIcon} from "../configurations/routes";
import {Brightness4 as LightMode, Brightness7 as DarkMode, GitHub,} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {getDialog, getIsDarkMode} from "../redux/ui/ui.selectors";
import {closeDialog, openDialog, toggleDarkTheme} from "../redux/ui/ui.actions";
import Tooltip from "./standalone/Tooltip";
import {getIsFahrenheit} from "../redux/weather/weather.selectors";
import {toggleIsFahrenheit} from "../redux/weather/weather.actions";
import {IconHelper, Row} from "./styled";
import {ReactComponent as CelsiusIcon} from "../assets/celsius.svg";
import {ReactComponent as FahrenheitIcon} from "../assets/fahrenheit.svg";
import Typography from "@material-ui/core/Typography";

const StyledToolBar = styled(Toolbar)`
  
  .logo {
    font-size: 1.5rem;
    cursor: pointer;
  }
  display: flex;
  justify-content: space-between;
  > * {
    align-items: center;
  }
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
  const isFahrenheit = useSelector(getIsFahrenheit);
  const { component: dialogContent } = useSelector(getDialog);

  const dispatch = useDispatch();

  const ToggleDarkModeIcon = isDarkMode ? DarkMode : LightMode;
  const handleMenuItemClick = path => {
    navigate(path);
  };

  function handleDarkModeToggle() {
    dispatch(toggleDarkTheme());
  }

  function handleGithubClick() {
    dispatch(!!dialogContent ? closeDialog() : openDialog("github", true));
  }

  function handleFahrenheitToggle() {
    dispatch(toggleIsFahrenheit());
  }

  function handleLogoClick() {
    navigate('/');
  }
  return (
    <AppBar position="static">
      <StyledToolBar>
        <Typography className={'logo'} variant={'h3'} onClick={handleLogoClick}>Weather Client</Typography>
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
          <CelsiusIcon />
          <FahrenheitIcon/>
          <Tooltip title={`Switch to ${isFahrenheit?"celsius":"fahrenheits"}`} aria-label="toggle dark mode on / off">
            <IconButton color="inherit" onClick={handleFahrenheitToggle}>
              <IconHelper as={isFahrenheit ? FahrenheitIcon : CelsiusIcon}/>
            </IconButton>
          </Tooltip>
          <Tooltip title={"GitHub repository"} aria-label="more">
            <IconButton aria-controls="visitGithub" color="inherit" aria-haspopup="true" onClick={handleGithubClick}>
              <GitHub />
            </IconButton>
          </Tooltip>
        </Row>
      </StyledToolBar>
    </AppBar>
  );
}

export default Header;
