import { SET_SELECTED_COMPONENT } from '../actions/types';
const defaultState = {
   loading: false,
   error: null,
   data: {
   }
};

export default (state = defaultState, action) => {
   switch (action.type) {
      case SET_SELECTED_COMPONENT:
         return {
            ...state,
            data: action.payload
         };
      default:
         return state;
   }
};
