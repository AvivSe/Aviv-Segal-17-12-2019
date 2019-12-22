import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSnackbar} from "../redux/ui/ui.selectors";
import {closeSnackbar} from "../redux/ui/ui.actions";
import {ThumbUp} from "@material-ui/icons"
import {StyledIconButton, StyledMuiSnackbar} from "./styled";
import Button from "@material-ui/core/Button";

export default function Snackbar (){
  const dispatch = useDispatch();
  const { open, message, duration , onUndo, onAccept} = useSelector(getSnackbar);

  const handleCloseSnackbarClick = () => {dispatch(closeSnackbar())};

  const handleUndoClick = () => {
    if(onUndo) {
      onUndo();
    }
    dispatch(closeSnackbar());
  };

  const handleAcceptClick = () => {
    if(onAccept) {
      onAccept();
    }
    dispatch(closeSnackbar());
  };
  return (
    <StyledMuiSnackbar
      variant={"error"}
      open={open}
      color={"secondary"}
      autoHideDuration={duration}
      onClose={handleCloseSnackbarClick}
      message={message}
      action={[
        !!onAccept && <StyledIconButton onClick={handleAcceptClick}><ThumbUp/></StyledIconButton>,
        !!onUndo && <Button onClick={handleUndoClick}>UNDO</Button>
      ]}
    >
    </StyledMuiSnackbar>
  );
};
