import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";

const pages = [
  { path: "/favorites", component: Favorites },
  { path: "/", exact: true, component: Home },
  { path: null, component: () => <div>404</div> }
];

function MainContent() {
  return (
    <Switch>
        <Route path={'/favorites'} component={Favorites}/>
        <Route path={'/'} exact={true} component={Home}/>
      <Route path={'*'} exact={true} component={()=><div>404</div>}/>

    </Switch>
  );
}

export default MainContent;
