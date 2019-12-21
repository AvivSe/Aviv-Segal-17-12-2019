import Header from "./Header";
import MainContent from "./MainContent";
import Snackbar from "./Snackbar";
import BottomNavigation from "./BottomNavigation";
import React from "react";
import styled from "styled-components";
import Dialog from "./Dialog";
import {useDispatch, useSelector} from "react-redux";
import {getDialog} from "../redux/ui/ui.selectors";
import {closeDialog} from "../redux/ui/ui.actions";
import LinearProgress from "./LinearProgress";
import {getIsPending} from "../redux/weather/weather.selectors";

const Wrapper = styled.div`
  background-color: ${({theme})=>theme.palette.primary.contrastText};
  min-height: 100vh;
`;

const dialogs = {
  '404': <div>Hello 404</div>,
  moreSettings: <div>Hello More Settings</div>,
  github: <div>Hello github</div>,
};

export default function Main() {
  const dialog = useSelector(getDialog);
  const dispatch = useDispatch();
  const isPending = useSelector(getIsPending); // please extend with more indicator if needed

  function handleDialogClose() {
    dispatch(closeDialog());
  }

  return (
    <Wrapper>
      <Header />
      {isPending && <LinearProgress/>}
      <MainContent />
      <Snackbar />
      <Dialog fullScreen={dialog.fullScreen} open={dialog.open} content={dialogs[dialog.name]} onClose={handleDialogClose}/>
      <BottomNavigation />
    </Wrapper>
  );
}
