import {ADD_CHILD_COMPONENT, CREATE_COMPONENT, DELETE_COMPONENT, UPDATE_COMPONENT} from '../actions/types';
import {cloneDeep} from 'lodash';

const defaultState = {
  error: null,
  loading: false,
  data: [{
    name: 'Root',
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
      return removeChildComponent(state, action.payload);
      // const newData = state.data.filter(data => data.name !== action.payload);
      // return {
      //   ...state,
      //   data: newData
      // };
    case ADD_CHILD_COMPONENT:
      // return addChildComponentv2(state, action.payload);
      return addChildComponent(state, action.payload);
    default:
      return state;
  }
};

const addChildComponentv2 = (state, { parentNode, data }) => {
  const deepCloned = cloneDeep(state.data);
  deepCloned.forEach(component => {
    if (component.name === parentNode.name) {
      const ref = deepCloned.reduce((acc, curr) => {
        console.log(curr);
        if (acc.name === data.name) return acc;
        else if (curr.name === data.name) return curr;
      });
      component.children.push(ref);
    }
  });
  console.log(deepCloned);
  return {
    ...state,
    data: deepCloned
  }
};

const addChildComponent = (state, { parentNode, data }) => {
  const deepCloned = cloneDeep(state.data);
  const newData = deepCloned.map(component => {
    return iterateObject(component, {parentNode, data});
  });
  return {
    ...state,
    data: newData
  }
};

const iterateObject = (obj, {parentNode, data}) => {
  if (obj.name === parentNode.name) {
    obj.children.push(data);
  }
  obj.children = obj.children.map(childComponent => {
    return iterateObject(childComponent, {parentNode, data});
  });
  return obj;
};


const removeChildComponent = (state, node) => {
  const deepCloned = cloneDeep(state.data);
  const newData = deepCloned.map(component => {
    return removeObject(component, node);
  });
  return {
    ...state,
    data: newData
  }
};

const removeObject = (obj, node) => {
  obj.children.filter(item => node.name !== item.name);
  obj.children.map(childComponent => {
    return removeObject(childComponent, node);
  });
  return obj;
};
