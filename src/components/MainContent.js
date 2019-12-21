import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import {MainContentHelper} from "./styled";

export default function MainContent() {
  return (
    <MainContentHelper>
      <Switch>
        <Route path={"/favorites"} component={Favorites} />
        <Route path={"/"} exact={true} component={Home} />
        <Route path={"*"} exact={true} component={() => <div>404</div>} />
      </Switch>
    </MainContentHelper>
  );
}
