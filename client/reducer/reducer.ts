import componentsReducer from "./componentsReducer";
import currentComponentReducer from "./currentComponentReducer";
import selectedComponentReducer from "./selectedComponentReducer";
import { combineReducers } from "redux";

export default combineReducers({
  components: componentsReducer,
  current: currentComponentReducer,
  selected: selectedComponentReducer
});

