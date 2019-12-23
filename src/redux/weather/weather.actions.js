export const ADD_TO_MAP = "ADD_TO_MAP";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_MY_FAVORITES";

export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const REMOVE_FROM_HISTORY = "REMOVE_FROM_HISTORY";

export const SET_SELECTED_CITY = "SET_SELECTED_CITY";
export const TOGGLE_IS_FAHRENHEIT = "TOGGLE_IS_FAHRENHEIT";

export const addToMap = city => {
  return { type: ADD_TO_MAP, payload: city };
};

export const addToHistory = city => {
  return { type: ADD_TO_HISTORY, payload: city.key };
};

export const addToFavorites = key => {
  return { type: ADD_TO_FAVORITES, payload: key };
};

export const removeFromFavorites = key => {
  return { type: REMOVE_FROM_FAVORITES, payload: key };
};

export const setSelectedCity = key => {
  return { type: SET_SELECTED_CITY, payload: key };
};

export const toggleIsFahrenheit = () => {
  return { type: TOGGLE_IS_FAHRENHEIT };
};
