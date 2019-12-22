import {Tooltip as MuiTooltip, withStyles} from "@material-ui/core";
import React from "react";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(MuiTooltip);

export default function Tooltip({ children, title, ...otherProps }) {
  return (
    <LightTooltip title={title} {...otherProps}>
      {children}
    </LightTooltip>
  );
}
