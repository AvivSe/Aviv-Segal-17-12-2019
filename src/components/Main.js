import Header from "./Header";
import MainContent from "./MainContent";
import Snackbar from "./Snackbar";
import React from "react";
import styled from "styled-components";
import Dialog from "./standalone/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { getDialog } from "../redux/ui/ui.selectors";
import { closeDialog } from "../redux/ui/ui.actions";
// import LinearProgress from "./standalone/LinearProgress";
import Redirect from "./standalone/Redirect";
import BottomNavigation from "./BottomNavigation";

const Wrapper = styled.div`
  ${({ theme: { type, palette } }) =>
    type === "dark"
      ? `background-color: ${palette.primary.dark};
         background-image: linear-gradient(315deg, ${palette.primary.dark} 25%, ${palette.secondary.dark} 100%);`
      : `background-color: ${palette.primary.contrastText};
         background-image: linear-gradient(315deg, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.02) 100%);`};
  min-height: 100vh;
`;

const dialogs = {
  "404": <div>Hello 404</div>,
  moreSettings: <div>Hello More Settings</div>,
  github: <Redirect to={"https://github.com/AvivSe/simple-weather-client"} name={"github.com"} />
};

export default function Main() {
  const dialog = useSelector(getDialog);
  const dispatch = useDispatch();
  // const isGloballyPending = useSelector(getIsGloballyPending);

  function handleDialogClose() {
    dispatch(closeDialog());
  }

  return (
    <Wrapper>
      <Header />
      {/*{isGloballyPending && <LinearProgress />}*/}
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
