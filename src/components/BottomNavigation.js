import MuiBottomNavigation from "@material-ui/core/BottomNavigation";
import React from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import styled from "styled-components";
import useNavigator from "../hooks/useNavigator";
import {pathMap, pathNames} from "../configurations/routes";

const StyledMuiBottomNavigation = styled(MuiBottomNavigation)`
  top: auto !important;
  bottom: 0 !important;
  position: fixed;
  width: 100vw;

  display: none;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: flex;
  }

  background-color: ${({ theme }) => theme.palette.primary.main} !important;
  .MuiSvgIcon-root {
    fill: ${({ theme }) => theme.palette.primary.contrastText};
  }
  .MuiBottomNavigationAction-label {
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
  .Mui-selected {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export default function BottomNavigation() {
  const [path, navigate] = useNavigator();

  return (
    <StyledMuiBottomNavigation
      value={path}
      onChange={(event, newValue) => {
        navigate(newValue);
      }}
      showLabels
    >
      {pathNames.map(pathName => {
        const { label, Icon } = pathMap[pathName];
        return <BottomNavigationAction key={label} label={label} value={pathName} className={path===pathName ? 'Mui-selected' : null} icon={<Icon />} />;
      })}
    </StyledMuiBottomNavigation>
  );
}
