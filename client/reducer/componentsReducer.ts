import {ADD_CHILD_COMPONENT, CREATE_COMPONENT, DELETE_COMPONENT, UPDATE_COMPONENT, ADD_ATTRIBUTE, DELETE_ATTRIBUTE} from '../actions/types';
// import {cloneDeep} from 'lodash';

const defaultState = {
  error: null,
  loading: false,
  data: [{
    name: 'Root',
    attributes: {
      'id': 'ID',
    },
    parent: {},
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
      return {
        ...state,
        data: updateComponent(state.data, action.payload)
      };
    case DELETE_COMPONENT:
      return {
        ...state,
        data: deleteComponent(state.data, action.payload)
      };
    case ADD_CHILD_COMPONENT:
      return {
        ...state,
        data: addChildComponent(state.data, action.payload)
      };
    case ADD_ATTRIBUTE:
      return {
        ...state,
        data: addAttribute(state.data, action.payload)
      };
    case DELETE_ATTRIBUTE:
      return {
        ...state,
        data: deleteAttribute(state.data, action.payload)
      };
    default:
      return state;
  }
};

// recursively update components and child components with same name as payload
const updateComponent = (components, payload) => {
  return components.map(item => {
    if (item.name === payload.name) return payload;
    else return {
      ...item,
      children: updateComponent(item.children, payload)
    }
  });
};

// recursively delete components and child components with same name as payload
const deleteComponent = (components, payload) => {
  const newComponents = components.map(item => {
    if (item.name === payload.name) return false;
    else return {
      ...item,
      children: deleteComponent(item.children, payload)
    }
  });
  return newComponents.filter(item => item !== false);
};

// recursively delete one specific component by parent and child components with same name as payload
const deleteOneComponent = (components, { parentComponent, data }) => {
  return components.map(item => {
    if (item.name === parentComponent.name) return {
      ...parentComponent,
      children: parentComponent.children.filter(childItem => childItem.name === data.name)
    };
    else return {
      ...item,
      children: deleteOneComponent(item.children, {parentComponent, data})
    };
  });
};

// recursively add child component of specific parent
const addChildComponent = (components, { parentComponent, data }) => {
  return components.map(item => {
    if (item.name === parentComponent.name) return {
      ...parentComponent,
      children: [...item.children, {
        ...data,
        parent: parentComponent
      }]
    };
    else return {
      ...item,
      children: addChildComponent(item.children, {parentComponent, data})
    };
  });
};

// recursively add attributes to child components
const addAttribute = (components, { selectedComponent, attributes }) => {
  return components.map(item => {
    if (item.name === selectedComponent.name) return {
      ...item,
      attributes: {
        ...item.attributes,
        ...attributes
      }
    };
    else return {
      ...item,
      children: addAttribute(item.children, { selectedComponent, attributes })
    };
  });
};

// recursively removes attributes to child components
const deleteAttribute = (components, { selectedComponent, attributeKey }) => {
  return components.map(item => {

    let newData = Object.assign({}, item.attributes);
    delete newData[attributeKey];

    if (item.name === selectedComponent.name) return {
      ...item,
      attributes: {
        ...newData
      }
    };
    else return {
      ...item,
      children: deleteAttribute(item.children, { selectedComponent, attributeKey })
    };
  });
};
