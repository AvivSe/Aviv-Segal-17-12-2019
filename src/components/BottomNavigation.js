import React from "react";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import useNavigator from "../hooks/useNavigator";
import {pathMap, pathNames, pathnameToIcon} from "../configurations/routes";
import {StyledMuiBottomNavigation} from "./styled";

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
