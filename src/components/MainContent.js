import React from "react";
import {Route, Switch} from "react-router-dom";
import Search from "./Search";
import Favorites from "./Favorites";
import {MainContentHelper} from "./styled";

export default function MainContent() {
  return (
    <MainContentHelper>
      <Switch>
        <Route path={"/favorites"} component={Favorites} />
        <Route path={"/"} exact={true} component={Search} />
        <Route path={"*"} exact={true} component={() => <div>404</div>} />
      </Switch>
    </MainContentHelper>
  );
}
