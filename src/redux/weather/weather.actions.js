import accuWeatherService from "../../AccuWeatherService";
import {openSnackbar} from "../ui/ui.actions";

export const CURRENT_WEATHER_REQUEST = "CURRENT_WEATHER_REQUEST";
export const CURRENT_WEATHER_SUCCESS = "CURRENT_WEATHER_SUCCESS";
export const CURRENT_WEATHER_ERROR = "CURRENT_WEATHER_REQUEST";

export const fetchCurrentWeather = cityKey => async  dispatch => {
  try {
    const response = await accuWeatherService.fetchCurrentWeather(cityKey);
    dispatch({ type: CURRENT_WEATHER_SUCCESS, payload: {...response, cityKey} })
  } catch (e) {
    dispatch({ type: CURRENT_WEATHER_ERROR, });
    dispatch(openSnackbar(e.message || "Something got occurred"))
  }
};
