import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createTheme,
  delTheme,
  editTheme,
  themesReducer,
} from "./reducers/themeReducer";
import { loginReducer } from "./reducers/userReducer";
import { alertReducer } from "./reducers/alertReducer";

const reducer = combineReducers({
  themes: themesReducer,
  delete: delTheme,
  create: createTheme,
  edit: editTheme,
  user: loginReducer,
  alert: alertReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
