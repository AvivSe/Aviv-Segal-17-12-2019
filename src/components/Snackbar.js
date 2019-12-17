import React  from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import {useDispatch, useSelector} from "react-redux";
import {getSnackbar} from "../redux/ui/ui.selectors";
import {closeSnackbar} from "../redux/ui/ui.actions";

export default function Snackbar (){
  const dispatch = useDispatch();
  const { open, message, duration } = useSelector(getSnackbar);

  const handleCloseSnackbarClick = () => dispatch(closeSnackbar());
  return (
    <MuiSnackbar
      variant={"error"}
      open={open}
      color={"secondary"}
      autoHideDuration={duration}
      onClose={handleCloseSnackbarClick}
      message={message}
    />
  );
};
