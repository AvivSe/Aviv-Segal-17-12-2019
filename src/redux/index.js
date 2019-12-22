import {combineReducers} from "redux";
import uiReducer from "./ui/ui.reducer";
import weatherReducer from "./weather/weather.reducer"

const reducers = combineReducers({
  ui: uiReducer,
  weather: weatherReducer
});

export default reducers;
