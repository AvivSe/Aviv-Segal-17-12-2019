import MuiBottomNavigation from "@material-ui/core/BottomNavigation";
import React from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import styled from "styled-components";
import useNavigator from "../hooks/useNavigator";
import {pathMap, pathNames, pathnameToIcon} from "../configurations/routes";

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
  const [currentPathname, navigate] = useNavigator();

  return (
    <StyledMuiBottomNavigation
      value={currentPathname}
      onChange={(event, newValue) => {
        navigate(newValue);
      }}
      showLabels
    >
      {pathNames.map(pathname => {
        const { label } = pathMap[pathname];
        const Icon = pathname===currentPathname?pathnameToIcon[pathname].selected : pathnameToIcon[pathname].default;
        return <BottomNavigationAction key={label} label={label} value={pathname} icon={<Icon/>} />;
      })}
    </StyledMuiBottomNavigation>
  );
}
