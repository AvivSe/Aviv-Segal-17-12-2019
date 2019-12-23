import {
  CLOSE_DIALOG,
  CLOSE_SNACKBAR,
  NAVIGATE,
  OPEN_DIALOG,
  OPEN_SNACKBAR,
  TOGGLE_DARK_MODE
} from "./ui.actions";

export const uiInitialState = {
  snackbar: { open: false, message: "", duration: 3000 },
  path: window.location.pathname,
  isDarkMode: false,
  dialog: { open: false, name: "404", fullScreen: false }
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
      return { ...state, dialog: { name: payload.name, fullScreen: payload.fullScreen, open: true } };
    default:
      return state;
  }
}

export default uiReducer;
