import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import useNavigator from "../hooks/useNavigator";
import {pathMap, pathNames} from "../configurations/routes";
import {GitHub} from "@material-ui/icons";

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  background-color: ${({theme, selected}) => (selected ? theme.palette.primary.dark : null)} !important;
`;

const UpperNavigation = styled.div`
  display: block;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;

function Header({width}) {
  const [path, navigate] = useNavigator();
  const handleMenuItemClick = path => {
    navigate(path);
  };
  return (
    <AppBar position="static">
      <StyledToolBar>
        <div>
          <Typography variant="h6" style={{cursor: 'pointer'}} onClick={()=>navigate('/')}>Herolo Weather Task</Typography>
        </div>
        <UpperNavigation>
          {pathNames.map(pathName => {
            const {label, Icon} = pathMap[pathName];
            return (
              <StyledButton
                color="inherit"
                key={label}
                selected={pathName === path}
                value={pathName}
                icon={<Icon/>}
                onClick={() => handleMenuItemClick(pathName)}
              >
                {label}
              </StyledButton>
            );
          })}
        </UpperNavigation>
      </StyledToolBar>
    </AppBar>
  );
}

export default Header;
