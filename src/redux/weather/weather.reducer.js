import { CURRENT_WEATHER_SUCCESS, CURRENT_WEATHER_ERROR, CURRENT_WEATHER_REQUEST } from "./weather.actions";

export const INITIAL_STATE = {
  map: {},
  pending: false
};

function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case CURRENT_WEATHER_SUCCESS:
      return { ...state, pending: false, map: { ...state.map, [payload.cityKey]: payload } };
    case CURRENT_WEATHER_ERROR:
      return { ...state, pending: false };
    case CURRENT_WEATHER_REQUEST:
      return { ...state, pending: true };

    default:
      return state;
  }
}

export default userReducer;
