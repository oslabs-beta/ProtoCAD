import componentsReducer from "./componentsReducer";
import currentComponentReducer from "./currentComponentReducer";
import selectedComponentReducer from "./selectedComponentReducer";
import directoryReducer from "./directoryReducer";
import { combineReducers } from "redux";

export default combineReducers({
  components: componentsReducer,
  current: currentComponentReducer,
  selected: selectedComponentReducer,
  directory: directoryReducer
});

