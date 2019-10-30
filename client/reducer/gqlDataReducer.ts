import {SET_GQL_DATA} from "../actions/types";
import {
   GQLStateInt
} from "../utils/InterfaceDefinitions";

const defaultState: GQLStateInt = {
   loading: false,
   error: null,
   data: {}
};

export default (state = defaultState, action) => {
   switch (action.type) {
      case SET_GQL_DATA:
         return {
            ...state,
            data: action.payload,
         };
      default:
         return state;
   }
};