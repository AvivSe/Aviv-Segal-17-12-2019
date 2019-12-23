import Header from "./Header";
import MainContent from "./MainContent";
import Snackbar from "./Snackbar";
import BottomNavigation from "./BottomNavigation";
import React from "react";
import styled from "styled-components";
import Dialog from "./standalone/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {getDialog, getIsGloballyPending} from "../redux/ui/ui.selectors";
import {closeDialog} from "../redux/ui/ui.actions";
import LinearProgress from "./standalone/LinearProgress";
import Redirect from "./standalone/Redirect";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.type === "dark" && theme.palette.primary.light};
  min-height: 100vh;
`;

const dialogs = {
  "404": <div>Hello 404</div>,
  moreSettings: <div>Hello More Settings</div>,
  github: <Redirect to={"https://github.com/AvivSe/Aviv-Segal-17-12-2019"} name={'github.com'}/>,
};

export default function Main() {
  const dialog = useSelector(getDialog);
  const dispatch = useDispatch();
  const isGloballyPending = useSelector(getIsGloballyPending);

  function handleDialogClose() {
    dispatch(closeDialog());
  }

  return (
    <Wrapper>
      <Header />
      {isGloballyPending && <LinearProgress />}
      <MainContent />
      <Snackbar />
      <Dialog
        fullScreen={dialog.fullScreen}
        open={dialog.open}
        content={dialogs[dialog.name]}
        onClose={handleDialogClose}
      />
      <BottomNavigation />
    </Wrapper>
  );
}
