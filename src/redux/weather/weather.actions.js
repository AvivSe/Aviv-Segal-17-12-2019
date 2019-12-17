import accuWeatherService from "../../AccuWeatherService";
import {openSnackbar} from "../ui/ui.actions";

export const CURRENT_WEATHER_REQUEST = "CURRENT_WEATHER_REQUEST";
export const CURRENT_WEATHER_SUCCESS = "CURRENT_WEATHER_SUCCESS";
export const CURRENT_WEATHER_ERROR = "CURRENT_WEATHER_REQUEST";

export const ADD_TO_MY_FAVORITES = "ADD_TO_MY_FAVORITES";
export const REMOVE_FROM_MY_FAVORITES = "REMOVE_FROM_MY_FAVORITES";

export const fetchCurrentWeather = cityKey => async  dispatch => {
  try {
    const response = await accuWeatherService.fetchCurrentWeather(cityKey);
    dispatch({ type: CURRENT_WEATHER_SUCCESS, payload: {...response, cityKey} })
  } catch (e) {
    dispatch({ type: CURRENT_WEATHER_ERROR, });
    dispatch(openSnackbar(e.message || "Something got occurred"))
  }
};

export const addToMyFavorites = cityKey => dispath => {
  dispath(openSnackbar(""))
  return { type: ADD_TO_MY_FAVORITES, payload: cityKey }
};

export const removeFromMyFavorites = cityKey => {
  return { type: REMOVE_FROM_MY_FAVORITES, payload: cityKey }
};
