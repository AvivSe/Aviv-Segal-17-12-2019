import { applyMiddleware, createStore } from "redux";
import reducers from "./index";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './'; // the value from combineReducers
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const appPersistReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  appPersistReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
export const persistor = persistStore(store);
export default store;
