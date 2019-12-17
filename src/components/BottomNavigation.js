import MuiBottomNavigation from "@material-ui/core/BottomNavigation";
import React, { useState } from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Home, Bookmark } from "@material-ui/icons";
import styled from "styled-components";
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
    background-color:  ${({ theme }) => theme.palette.primary.dark};
  }
`;
export default function BottomNavigation() {
  const [value, setValue] = useState("home");

  return (
    <StyledMuiBottomNavigation
      value={value}
      onChange={(event, newValue) => {
        console.log(event.target.value);
        console.log(newValue);
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Home" value="hello" icon={<Home />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<Bookmark />} />
    </StyledMuiBottomNavigation>
  );
}
