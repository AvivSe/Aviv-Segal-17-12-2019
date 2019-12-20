import accuWeatherService from "../../AccuWeatherService";
import { openSnackbar } from "../ui/ui.actions";

export const CURRENT_WEATHER_REQUEST = "CURRENT_WEATHER_REQUEST";
export const CURRENT_WEATHER_SUCCESS = "CURRENT_WEATHER_SUCCESS";
export const CURRENT_WEATHER_ERROR = "CURRENT_WEATHER_REQUEST";

export const ADD_TO_MY_BOOKMARKS = "ADD_TO_MY_BOOKMARKS";
export const REMOVE_FROM_MY_BOOKMARKS = "REMOVE_FROM_MY_BOOKMARKS";

export const SET_SELECTED_CITY = "SET_SELECTED_CITY";

export const fetchCurrentWeather = city => async dispatch => {
  try {
    const response = await accuWeatherService.fetchCurrentWeather(city.key);
    dispatch({ type: CURRENT_WEATHER_SUCCESS, payload: { ...response, ...city } });
    dispatch(openSnackbar(`Showing result for ${city.name}`));
  } catch (e) {
    dispatch({ type: CURRENT_WEATHER_ERROR });
    dispatch(openSnackbar(e.message || "Something got occurred"));
  }
};

export const addToMyBookmarks = key => dispatch => {
  dispatch({ type: ADD_TO_MY_BOOKMARKS, payload: key });
};

export const removeFromMyBookmarks = key => dispatch => {
  dispatch({ type: REMOVE_FROM_MY_BOOKMARKS, payload: key });
};

export const setSelectedCity = city => dispatch => {
  dispatch(fetchCurrentWeather(city));
  dispatch({ type: SET_SELECTED_CITY, payload: city });
};
