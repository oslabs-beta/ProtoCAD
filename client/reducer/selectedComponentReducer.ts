import * as types from '../actions/types';
import { SelectedComponentStateInt } from '../utils/InterfaceDefinitions';

const defaultState: SelectedComponentStateInt = {
  loading: false,
  error: null,
  data: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_COMPONENT:
      console.log(action);
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
