import React from "react";
import {openSnackbar} from "../redux/ui/ui.actions";
import {useDispatch} from "react-redux";

export default function Favorites() {
  const dispatch = useDispatch();
  return (
    <div className={'mainContent'}>
      favorites works!
      <button onClick={()=>dispatch(openSnackbar("Hello"))
      }>Test Snackbar</button>
    </div>
  );
}
