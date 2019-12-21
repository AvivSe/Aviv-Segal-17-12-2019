import {
  CURRENT_WEATHER_SUCCESS,
  CURRENT_WEATHER_ERROR,
  CURRENT_WEATHER_REQUEST,
  REMOVE_FROM_MY_BOOKMARKS,
  ADD_TO_MY_BOOKMARKS,
  SET_SELECTED_CITY,
  TOGGLE_IS_FAHRENHEIT
} from "./weather.actions";

export const INITIAL_STATE = {
  ids: [],
  map: {},
  pending: false,
  isFahrenheit: false,
  selectedCity: { name: "Tel Aviv", key: "215854" },
  bookmarks: [] // ids only
};

function userReducer(state = INITIAL_STATE, { type, payload }) {
  let bookmarks = [...state.bookmarks];
  const ids = [...state.ids];
  const map = { ...state.map };
  switch (type) {
    case CURRENT_WEATHER_SUCCESS:
      console.log("im here", ids.indexOf(payload.key));
      if (ids.indexOf(payload.key) === -1) {
        ids.push(payload.key);
      }
      map[payload.key] = { ...payload };
      return {
        ...state,
        pending: false,
        ids,
        map
      };
    case CURRENT_WEATHER_ERROR:
      return { ...state, pending: false };
    case CURRENT_WEATHER_REQUEST:
      return { ...state, pending: true };
    case REMOVE_FROM_MY_BOOKMARKS:
      bookmarks = bookmarks.filter(key => key !== payload);
      return { ...state, bookmarks };
    case ADD_TO_MY_BOOKMARKS:
      console.log(payload);
      if (bookmarks.indexOf(payload)) {
        bookmarks.push(payload);
      }
      return { ...state, bookmarks };
    case SET_SELECTED_CITY:
      return { ...state, selectedCity: payload };
    case TOGGLE_IS_FAHRENHEIT:
      return { ...state, isFahrenheit: !state.isFahrenheit };
    default:
      return state;
  }
}

export default userReducer;
