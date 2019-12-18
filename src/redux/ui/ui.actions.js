export const OPEN_SNACKBAR = "OPEN_SNACKBAR";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const NAVIGATE = "NAVIGATE";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

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
