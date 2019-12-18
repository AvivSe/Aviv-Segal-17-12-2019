import {CLOSE_SNACKBAR, NAVIGATE, OPEN_SNACKBAR, TOGGLE_DARK_MODE} from "./ui.actions";

export const uiInitialState = {
  snackbar: { open: false, message: "", duration: 3000 },
  path: window.location.pathname,
  isDarkMode: true,
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
      console.log(state);
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
}

export default uiReducer;
