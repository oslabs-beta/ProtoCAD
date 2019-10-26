import * as types from '../actions/types';

const defaultState = {
  error: null,
  loading: null,
  data: '',
};

export default (state: any = defaultState, action: any) => {
  switch (action.type) {
    case types.SET_CODE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
