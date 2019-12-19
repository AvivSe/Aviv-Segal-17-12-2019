import React  from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import {useDispatch, useSelector} from "react-redux";
import {getSnackbar} from "../redux/ui/ui.selectors";
import {closeSnackbar} from "../redux/ui/ui.actions";
import IconButton from "@material-ui/core/IconButton";
import { ThumbUp, Close } from "@material-ui/icons"
import styled from "styled-components";
const StyledIconButton = styled(IconButton)`
  svg {
    fill: #ffffff
  }
`;

export default function Snackbar (){
  const dispatch = useDispatch();
  const { open, message, duration , onDismiss, onAccept} = useSelector(getSnackbar);

  const handleCloseSnackbarClick = () => {dispatch(closeSnackbar())};

  const handleDismissClick = () => {
    if(onDismiss) {
      onDismiss();
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
    <MuiSnackbar
      variant={"error"}
      open={open}
      color={"secondary"}
      autoHideDuration={duration}
      onClose={handleCloseSnackbarClick}
      message={message}
      action={[
        !!onAccept && <StyledIconButton onClick={handleAcceptClick}><ThumbUp/></StyledIconButton>,
        !!onDismiss && <StyledIconButton onClick={handleDismissClick}><Close/></StyledIconButton>
      ]}
    >
    </MuiSnackbar>
  );
};
