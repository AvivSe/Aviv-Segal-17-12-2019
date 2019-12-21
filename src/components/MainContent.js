import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Bookmarks from "./Bookmarks";
import styled from "styled-components";

const Wrapper = styled.div`
  .mainContent {
    margin: 1rem auto 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    padding: 0 0.5rem;
    .mainContent {
      padding: 0 2rem 56px 2rem;
    }
  }
`;
export default function MainContent() {
  return (
    <Wrapper>
      <Switch>
        <Route path={"/bookmarks"} component={Bookmarks} />
        <Route path={"/"} exact={true} component={Home} />
        <Route path={"*"} exact={true} component={() => <div>404</div>} />
      </Switch>
    </Wrapper>
  );
}
