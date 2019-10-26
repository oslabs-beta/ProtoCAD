import {
  SET_RESOLVER_CODE,
} from '../actions/types';

export default (state = {
  error: null,
  loading: false,
  data: 'const resolver = () => {\n\n}',
}, action) => {
  switch (action.type) {
    case SET_RESOLVER_CODE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
