import { CURRENT_WEATHER_SUCCESS, CURRENT_WEATHER_ERROR, CURRENT_WEATHER_REQUEST, REMOVE_FROM_MY_FAVORITES, ADD_TO_MY_FAVORITES } from "./weather.actions";

export const INITIAL_STATE = {
  map: {},
  pending: false,
  favorites: [], // ids only
};

function userReducer(state = INITIAL_STATE, { type, payload }) {
  let favorites = [...state.favorites];

  switch (type) {
    case CURRENT_WEATHER_SUCCESS:
      return { ...state, pending: false, map: { ...state.map, [payload.cityKey]: payload } };
    case CURRENT_WEATHER_ERROR:
      return { ...state, pending: false };
    case CURRENT_WEATHER_REQUEST:
      return { ...state, pending: true };
    case REMOVE_FROM_MY_FAVORITES:
      favorites = favorites.filter(key => key !== payload);
      return { ...state, favorites};
    case ADD_TO_MY_FAVORITES:
      if(favorites.indexOf(payload) === -1) {
        favorites.push(payload);
      }
      return { ...state, favorites};
    default:
      return state;
  }
}

export default userReducer;
