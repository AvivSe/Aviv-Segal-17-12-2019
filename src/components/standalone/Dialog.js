import React from "react";
import {Dialog as MuiDialog, IconButton, Toolbar} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import styled from "styled-components";

const MainContent = styled.div`
  display:flex;
  justify-content: center;
`;

const StyledDialog = styled(MuiDialog)`
  .MuiPaper-root {
    min-height: 280px;
    min-width: 300px;
  }
`;

function Dialog({ open, content, onClose, fullScreen, ...otherProps }) {
  return (
    <StyledDialog fullScreen={fullScreen} open={open} {...otherProps}>
      <Toolbar>
        <IconButton edge="start" onClick={onClose} aria-label="close">
          <Close/>
        </IconButton>
      </Toolbar>
      <MainContent>{content || "N/A"}</MainContent>
    </StyledDialog>
  );
}

export default Dialog;
