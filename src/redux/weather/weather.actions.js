import accuWeatherService from "../../AccuWeatherService";
import { openSnackbar } from "../ui/ui.actions";
export const CURRENT_WEATHER_REQUEST = "CURRENT_WEATHER_REQUEST";
export const CURRENT_WEATHER_SUCCESS = "CURRENT_WEATHER_SUCCESS";
export const CURRENT_WEATHER_ERROR = "CURRENT_WEATHER_ERROR";

export const FETCH_BOOKMARKS_REQUEST = "FETCH_BOOKMARKS_REQUEST";
export const FETCH_BOOKMARKS_SUCCESS = "FETCH_BOOKMARKS_SUCCESS";
export const FETCH_BOOKMARKS_ERROR = "FETCH_BOOKMARKS_ERROR";

export const ADD_TO_MY_BOOKMARKS = "ADD_TO_MY_BOOKMARKS";
export const REMOVE_FROM_MY_BOOKMARKS = "REMOVE_FROM_MY_BOOKMARKS";

export const SET_SELECTED_CITY = "SET_SELECTED_CITY";
export const TOGGLE_IS_FAHRENHEIT = "TOGGLE_IS_FAHRENHEIT";

export const fetchCurrentWeather = city => async dispatch => {
  try {
    dispatch({ type: CURRENT_WEATHER_REQUEST });

    dispatch({
      type: CURRENT_WEATHER_SUCCESS,
      payload: { ...await accuWeatherService.fetchCurrentWeather(city) }
    });
  } catch (e) {
    dispatch({ type: CURRENT_WEATHER_ERROR });
    dispatch(openSnackbar(e.message || "Something got occurred"));
  }
};

export const fetchManyCurrentWeather = cities => async dispatch => {
  try {
    dispatch({ type: FETCH_BOOKMARKS_REQUEST });

    dispatch({
      type: FETCH_BOOKMARKS_SUCCESS,
      payload: { ...await accuWeatherService.fetchManyCurrentWeather(cities), }
    });
  } catch (e) {
    dispatch({ type: FETCH_BOOKMARKS_ERROR });
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
  if (!!city && city !== "") {
    dispatch(fetchCurrentWeather(city));
    dispatch({ type: SET_SELECTED_CITY, payload: city });
  } else {
    dispatch({ type: SET_SELECTED_CITY, payload: { key: null, name: null } });
  }
};

export const toggleIsFahrenheit = () => {
  return { type: TOGGLE_IS_FAHRENHEIT };
};
