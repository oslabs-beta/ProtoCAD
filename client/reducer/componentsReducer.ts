import {CREATE_COMPONENT, DELETE_COMPONENT, UPDATE_COMPONENT} from '../actions/types';

const defaultState = {
  error: null,
  loading: false,
  data: [{
    name: 'ComponentName',
    attributes: {},
    children: []
  }]
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case CREATE_COMPONENT:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case UPDATE_COMPONENT:
      console.log(action.payload);
      return {
        ...state,
        data: state.data.map(data => data.name === action.payload.parentName ?
            {
              ...data,
              children: [...data.children, action.payload.data]
            } : data)
      };
    case DELETE_COMPONENT:
      const newData = state.data.filter(data => data.name !== action.payload);
      return {
        ...state,
        data: newData
      };
    default:
      return state;
  }
};