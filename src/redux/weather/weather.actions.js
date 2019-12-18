import accuWeatherService from "../../AccuWeatherService";
import {openSnackbar} from "../ui/ui.actions";

export const CURRENT_WEATHER_REQUEST = "CURRENT_WEATHER_REQUEST";
export const CURRENT_WEATHER_SUCCESS = "CURRENT_WEATHER_SUCCESS";
export const CURRENT_WEATHER_ERROR = "CURRENT_WEATHER_REQUEST";

export const ADD_TO_MY_BOOKMARKS = "ADD_TO_MY_BOOKMARKS";
export const REMOVE_FROM_MY_BOOKMARKS = "REMOVE_FROM_MY_BOOKMARKS";

export const fetchCurrentWeather = cityKey => async  dispatch => {
  try {
    const response = await accuWeatherService.fetchCurrentWeather(cityKey);
    dispatch({ type: CURRENT_WEATHER_SUCCESS, payload: {...response, cityKey} })
  } catch (e) {
    dispatch({ type: CURRENT_WEATHER_ERROR, });
    dispatch(openSnackbar(e.message || "Something got occurred"))
  }
};

export const addToMyBookmarks = ({key, name}) => dispatch => {
  // dispatch(openSnackbar(`${name} added to your bookmarks`));
  dispatch({ type: ADD_TO_MY_BOOKMARKS, payload: key })
};

export const removeFromMyBookmarks = ({key , name}) => dispatch => {
  // dispatch(openSnackbar(`${name} removed from bookmarks, todo undo.`));
  dispatch({ type: REMOVE_FROM_MY_BOOKMARKS, payload: key });
};
