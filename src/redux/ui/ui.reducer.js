import {CLOSE_SNACKBAR, NAVIGATE, OPEN_SNACKBAR} from "./ui.actions";

export const uiInitialState = {
  snackbar: { open: false, message: "", duration: 3000 },
  path: "/",
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
    default:
      return state;
  }
}

export default uiReducer;
