import * as types from '../actions/types';
import {
  ComponentInt,
  ParentInt,
  ChildInt,
  ComponentStateInt,
} from '../utils/InterfaceDefinitions';


const initialState: ComponentStateInt = {
  error: null,
  loading: false,
  data: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.CREATE_COMPONENT:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case types.UPDATE_COMPONENT:
      return {
        ...state,
        data: updateComponent(state.data, action.payload),
      };
    case types.DELETE_COMPONENT:
      return {
        ...state,
        data: deleteComponent(state.data, action.payload),
      };
    case types.ADD_CHILD_COMPONENT:
      return {
        ...state,
        data: addChildComponent(state.data, action.payload),
      };
    case types.DELETE_ONE_COMPONENT:
      return {
        ...state,
        data: deleteOneComponent(state.data, action.payload),
      };
    case types.ADD_ATTRIBUTE:
      return {
        ...state,
        data: addAttribute(state.data, action.payload),
      };
    case types.UPDATE_ATTRIBUTE:
      return {
        ...state,
        data: updateAttribute(state.data, action.payload)
      };
    case types.DELETE_ATTRIBUTE:
      return {
        ...state,
        data: deleteAttribute(state.data, action.payload),
      };
    default:
      return state;
  }
};

// recursively update components and child components with same name as payload
const updateComponent = (components: any[], payload: ComponentInt) => components.map((item) => {
  if (item.name === payload.name) return payload;
  return {
    ...item,
    children: updateComponent(item.children, payload),
  };
});

// recursively delete components and child components with same name as payload
const deleteComponent = (components: any[], payload: ComponentInt) => {
  const newComponents = components.map((item) => {
    if (item.name === payload.name) return false;
    return {
      ...item,
      children: deleteComponent(item.children, payload),
    };
  });
  return newComponents.filter((item) => item !== false);
};

// recursively delete one specific component by parent and child components with same name as payload
const deleteOneComponent = (
  components: any[],
  {
    parentComponent,
    child,
  }: {
  parentComponent: ParentInt,
  child: ChildInt
  },
) => components.map((item) => {
  if (item.name === parentComponent.name) {
    return {
      ...parentComponent,
      children: parentComponent.children.filter((childItem) => childItem.name !== child.name),
    };
  }
  return {
    ...item,
    children: deleteOneComponent(item.children, { parentComponent, child }),
  };
});

// recursively add child component of specific parent
const addChildComponent = (
  components: any[],
  {
    parentComponent,
    child,
  }: {
    parentComponent: ParentInt,
    child: ChildInt
    },
) => components.map((item) => {
  if (item.name === parentComponent.name) {
    return {
      ...parentComponent,
      children: [...item.children, {
        ...child,
        parent: parentComponent,
      }],
    };
  }
  return {
    ...item,
    children: addChildComponent(item.children, { parentComponent, child }),
  };
});

// recursively add attributes to child components
const addAttribute = (
  components: any[],
  {
    component,
    attributes,
  }: {
  component: ComponentInt,
  attributes: object
  },
) => components.map((item) => {
  if (item.name === component.name) {
    return {
      ...item,
      attributes: {
        ...item.attributes,
        ...attributes,
      },
    };
  }
  return {
    ...item,
    children: addAttribute(item.children, { component, attributes }),
  };
});

// recursively removes attributes to child components
const deleteAttribute = (
  components: any[],
  {
    component,
    attributeKey,
  }: {
  component: ComponentInt,
  attributeKey: string,
  },
) => components.map((item) => {
  const newData = { ...item.attributes };
  delete newData[attributeKey];

  if (item.name === component.name) {
    return {
      ...item,
      attributes: {
        ...newData,
      },
    };
  }
  return {
    ...item,
    children: deleteAttribute(item.children, { component, attributeKey }),
  };
});

const updateAttribute = (components: any[], attributes) => {
  let updatedComponents = components;
  for (let [key, value] of Object.entries(attributes.data)) {
    const filtered = updatedComponents.filter(component => component.name === key);
    if (filtered.length < 1) continue;
    const selected = filtered[0];
    selected.attributes = Object.assign(selected.attributes, value);
    updatedComponents = updateComponent(updatedComponents, selected);
  }
  return updatedComponents;
};