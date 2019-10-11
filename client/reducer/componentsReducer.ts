import {ADD_CHILD_COMPONENT, CREATE_COMPONENT, DELETE_COMPONENT, UPDATE_COMPONENT, ADD_ATTRIBUTE} from '../actions/types';
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
      // return removeChildComponent(state, action.payload);
    case ADD_CHILD_COMPONENT:
      return {
        ...state,
        data: addChildComponent(state.data, action.payload)
      };
      // return addChildComponent(state, action.payload);
    case ADD_ATTRIBUTE:
      return {
        ...state,
        data: addAttribute(state.data, action.payload)
      };
      // return addAttribute(state, action.payload);
      // return {
      //   ...state,
      //   data: state.data.map(data => data.name === action.payload.selectedNode.name ?
      //       {
      //         ...data,
      //         attributes: {...data.attributes, ...action.payload.attribute}
      //       } : data)
      // };
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
  return components.filter(item => {
    if (item.name === payload.name) return false;
    else return {
      ...item,
      children: deleteComponent(item.children, payload)
    }
  });
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
      attributes
    };
    else return {
      ...item,
      children: addAttribute(item.children, { selectedComponent, attributes })
    };
  });
};

// const addChildComponent = (state, { parentNode, data }) => {
//   const deepCloned = cloneDeep(state.data);
//   const newData = deepCloned.map(component => {
//     return iterateObject(component, {parentNode, data});
//   });
//   return {
//     ...state,
//     data: newData
//   }
// };

// const iterateObject = (obj, {parentNode, data}) => {
//   if (obj.name === parentNode.name) {
//     obj.children.push(data);
//   }
//   const newData = obj.children.map(childComponent => {
//     return iterateObject(childComponent, {parentNode, data});
//   });
//   return {
//     ...obj,
//     children: newData
//   };
// };


// const removeChildComponent = (state, node) => {
//   const deepCloned = cloneDeep(state.data);
//   const newData = deepCloned.map(component => {
//     return removeObject(component, node);
//   });
//
//   const firstLayer = newData.filter(component => node.name !== component.name);
//   return {
//     ...state,
//     data: firstLayer
//   }
// };

// const removeObject = (obj, node) => {
//
//   const data = obj.children.filter(item => {
//     return node.name !== item.name
//   });
//
//   const newObj = {
//     ...obj,
//     children: data
//   };
//
//   const recursedData = newObj.children.map(childComponent => {
//     return removeObject(childComponent, node);
//   });
//
//   return {
//     ...newObj,
//     children: recursedData
//   }
// };


// const addAttribute = (state, payload) => {
//
//   const deepCloned = cloneDeep(state.data);
//   const newData = deepCloned.map(component => {
//     return addObject(component, payload);
//   });
//
//   return {
//     ...state,
//     data: newData.map(data => data.name === payload.selectedNode.name ?
//         {
//           ...data,
//           attributes: {...data.attributes, ...payload.attribute}
//         } : data)
//   };
// };


// const addObject = (obj, payload) => {
//
//   console.log(obj)
//   console.log(obj.children.length)
//
//   if (obj.children.length === 0) {
//     console.log('helo')
//     return {
//       ...obj
//     }
//   }
//
//   const data = obj.children.map(item => {
//     if (item.name === payload.selectedNode.name) {
//       const newObj = {
//         ...data,
//         attributes: {...data, ...payload.attribute}
//       };
//       return newObj;
//     }
//   });
//
//   const newObj = {
//     ...obj,
//     children: data
//   };
//
//   const recursedData = newObj.children.map(childComponent => {
//     return addObject(childComponent, payload.selectedNode);
//   });
//
//   return {
//     ...newObj,
//     children: recursedData
//   }
// };
