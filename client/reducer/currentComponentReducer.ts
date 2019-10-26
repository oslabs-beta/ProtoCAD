import * as types from '../actions/types';
import {
  CurrentComponentStateInt,
} from '../utils/InterfaceDefinitions';


const defaultState: CurrentComponentStateInt = {
  error: null,
  loading: null,
  data: {},
};

export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case types.SET_CURRENT_COMPONENT:
      return {
        ...state,
        data: action.payload,
      };
    case types.EDIT_CURRENT_COMPONENT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
