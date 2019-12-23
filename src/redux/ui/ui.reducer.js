import {
  CLOSE_DIALOG,
  CLOSE_SNACKBAR,
  NAVIGATE,
  OPEN_DIALOG,
  OPEN_SNACKBAR, SET_NOT_PENDING,
  SET_ON_PENDING,
  TOGGLE_DARK_MODE
} from "./ui.actions";

export const uiInitialState = {
  onPending: [],
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
    case SET_ON_PENDING:
      return { ...state, onPending: [...state.onPending, payload] }; // the payload is used as request id
    case SET_NOT_PENDING:
      return {...state, onPending: state.onPending.filter(requestId => requestId !== payload)};
    default:
      return state;
  }
}

export default uiReducer;
