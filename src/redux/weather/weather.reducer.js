import { CURRENT_WEATHER_SUCCESS, CURRENT_WEATHER_ERROR, CURRENT_WEATHER_REQUEST, REMOVE_FROM_MY_BOOKMARKS, ADD_TO_MY_BOOKMARKS } from "./weather.actions";

export const INITIAL_STATE = {
  map: {},
  pending: false,
  bookmarks: [], // ids only
};

function userReducer(state = INITIAL_STATE, { type, payload }) {
  let bookmarks = [...state.bookmarks];

  switch (type) {
    case CURRENT_WEATHER_SUCCESS:
      return { ...state, pending: false, map: { ...state.map, [payload.cityKey]: payload } };
    case CURRENT_WEATHER_ERROR:
      return { ...state, pending: false };
    case CURRENT_WEATHER_REQUEST:
      return { ...state, pending: true };
    case REMOVE_FROM_MY_BOOKMARKS:
      bookmarks = bookmarks.filter(key => key !== payload);
      return { ...state, bookmarks};
    case ADD_TO_MY_BOOKMARKS:
      console.log(payload);
      if(bookmarks.indexOf(payload)) {
        bookmarks.push(payload);
      }
      return { ...state, bookmarks};
    default:
      return state;
  }
}

export default userReducer;
