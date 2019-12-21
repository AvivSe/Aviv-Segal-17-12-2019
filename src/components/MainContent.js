import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import styled from "styled-components";

const Wrapper = styled.div`
  .mainContent {
    margin: 1rem auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 0.5rem;
    .mainContent {
      padding-block-end: 56px;
    }
  }
`;
export default function MainContent() {
  return (
    <Wrapper>
      <Switch>
        <Route path={"/favorites"} component={Favorites} />
        <Route path={"/"} exact={true} component={Home} />
        <Route path={"*"} exact={true} component={() => <div>404</div>} />
      </Switch>
    </Wrapper>
  );
}
