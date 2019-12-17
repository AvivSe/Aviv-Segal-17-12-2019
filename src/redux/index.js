import { combineReducers } from "redux";
import uiReducer from "./ui/ui.reducer";

const reducers = combineReducers({
  ui: uiReducer
});

export default reducers;
