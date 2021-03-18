import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createTheme,
  delTheme,
  editTheme,
  themesReducer,
} from "./reducers/themeReducer";

const reducer = combineReducers({
  themes: themesReducer,
  delete: delTheme,
  create: createTheme,
  edit: editTheme,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
