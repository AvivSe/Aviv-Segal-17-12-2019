import { CLOSE_SNACKBAR, NAVIGATE, OPEN_SNACKBAR, TOGGLE_DARK_MODE, CLOSE_DIALOG, OPEN_DIALOG } from "./ui.actions";

export const uiInitialState = {
  snackbar: { open: false, message: "", duration: 3000 },
  path: window.location.pathname,
  isDarkMode: true,
  dialog: { open: false, name: "404" }
};

function uiReducer(state = uiInitialState, { type, payload }) {
  switch (type) {
    case NAVIGATE:
      return { ...state, path: payload };
    case OPEN_SNACKBAR:
      return { ...state, snackbar: { ...state.snackbar, ...payload, open: true } };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: { ...state.snackbar, open: false }
      };
    case TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: !state.isDarkMode };
    case CLOSE_DIALOG:
      return { ...state, dialog: { open: false } };
    case OPEN_DIALOG:
      return { ...state, dialog: { name: payload, open: true } };
    default:
      return state;
  }
}

export default uiReducer;
