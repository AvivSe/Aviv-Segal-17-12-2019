export const OPEN_SNACKBAR = "OPEN_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const NAVIGATE = "NAVIGATE";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export const SET_ON_PENDING = "SET_ON_PENDING";
export const SET_NOT_PENDING = "SET_NOT_PENDING";

export const openSnackbar = (message, duration = 3000) => {
  return { type: OPEN_SNACKBAR, payload: { message, duration } }
};

export const closeSnackbar = () => {
  return { type: CLOSE_SNACKBAR }
};

export const navigate = path => {
  return { type: NAVIGATE, payload: path}
};

export const toggleDarkTheme = () => {
  return { type: TOGGLE_DARK_MODE }
};

export const closeDialog = () => {
  return { type: CLOSE_DIALOG }
};

export const openDialog = (name, fullScreen) => {
  return { type: OPEN_DIALOG , payload: {name, fullScreen }}
};

export const setOnPending = requestId => {
  return { type: SET_ON_PENDING, payload: requestId }
};

export const setNotPending = requestId => {
  return { type: SET_NOT_PENDING, payload: requestId }
};
