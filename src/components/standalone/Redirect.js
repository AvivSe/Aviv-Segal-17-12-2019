import React from "react";
import Button from "@material-ui/core/Button";

export default function Redirect({to, name }) {

  function handleClick() {
    window.location.href = to;
  }
  return <div>
    <Button style={{backgroundColor: "#323232", color: "#dddddd"}} onClick={handleClick}> Click here to enable redirection to {name} </Button>
  </div>
}
