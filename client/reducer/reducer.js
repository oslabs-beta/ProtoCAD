import componentReducer from "./componentReducer";
import { combineReducers } from "redux";

export default combineReducers({
  currentComponent: componentReducer
});

