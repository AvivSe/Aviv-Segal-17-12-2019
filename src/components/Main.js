import Header from "./Header";
import MainContent from "./MainContent";
import Snackbar from "./Snackbar";
import BottomNavigation from "./BottomNavigation";
import React from "react";
import styled from "styled-components";
import {GitHub} from "@material-ui/icons";

const StyledGitHub = styled(GitHub)`
  fill: ${({theme}) => theme.palette.common.white};
 `;

const WaterMark = styled.a`
  color: ${({ theme }) => theme.palette.primary.light};
`;

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.palette.light};
`;

export default function Main() {
  return (
    <Wrapper>
      <Header />
      <MainContent />
      <StyledGitHub />
      <WaterMark href={"https://github.com/avivse/"}>github.com/avivse</WaterMark>
      <Snackbar />
      <BottomNavigation />
    </Wrapper>
  );
}
