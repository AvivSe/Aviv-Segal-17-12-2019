import Header from "./Header";
import MainContent from "./MainContent";
import Snackbar from "./Snackbar";
import BottomNavigation from "./BottomNavigation";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.palette.primary.contrastText};
  min-height: 100vh;
`;

export default function Main() {
  return (
    <Wrapper>
      <Header />
      <MainContent />
      <Snackbar />
      <BottomNavigation />
    </Wrapper>
  );
}
