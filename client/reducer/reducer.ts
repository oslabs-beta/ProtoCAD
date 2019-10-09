import componentsReducer from "./componentsReducer";
import currentComponentReducer from "./currentComponentReducer";
import { combineReducers } from "redux";

export default combineReducers({
  components: componentsReducer,
  current: currentComponentReducer
});

