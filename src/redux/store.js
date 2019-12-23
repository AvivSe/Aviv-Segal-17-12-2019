import {createStore} from "redux";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './'; // the value from combineReducers
import {composeWithDevTools} from "redux-devtools-extension";

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['ui'],
  stateReconciler: autoMergeLevel2
};

const appPersistReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  appPersistReducer,
  composeWithDevTools()
);
export const persistor = persistStore(store);
export default store;
