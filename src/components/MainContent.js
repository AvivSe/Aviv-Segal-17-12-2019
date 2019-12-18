import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Bookmarks from "./Bookmarks";

export default function MainContent() {
  return (
    <div>
      <Switch>
        <Route path={"/bookmarks"} component={Bookmarks} />
        <Route path={"/"} exact={true} component={Home} />
        <Route path={"*"} exact={true} component={() => <div>404</div>} />
      </Switch>
    </div>
  );
}
