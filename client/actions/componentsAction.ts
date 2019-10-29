import {
  ComponentInt,
  ChildInt,
} from '../utils/InterfaceDefinitions';

import {
  SET_CODE,
  CREATE_COMPONENT,
  DELETE_COMPONENT,
  UPDATE_COMPONENT,
  ADD_CHILD_COMPONENT,
  ADD_ATTRIBUTE,
  EDIT_CURRENT_COMPONENT,
  SET_CURRENT_COMPONENT,
  DELETE_ATTRIBUTE,
  SET_SELECTED_COMPONENT,
  DELETE_ONE_COMPONENT,
  SET_DIRECTORY,
  SET_CURRENT_FILE, SET_RESOLVER_CODE, UPDATE_ATTRIBUTE,
} from './types';


export const createComponent = (component: ComponentInt) => ({
  type: CREATE_COMPONENT,
  payload: component,
});

export const deleteComponent = (component: ComponentInt) => ({
  type: DELETE_COMPONENT,
  payload: component,
});

export const deleteOneComponent = (parentComponent: ComponentInt, child: ChildInt) => ({
  type: DELETE_ONE_COMPONENT,
  payload: {
    parentComponent,
    child,
  },
});

export const updateComponent = (component: ComponentInt) => ({
  type: UPDATE_COMPONENT,
  payload: component,
});

export const addChildComponent = (parentComponent: ComponentInt, child: ChildInt, array: boolean) => ({
  type: ADD_CHILD_COMPONENT,
  payload: {
    parentComponent,
    child,
    array,
  },
});

export const addAttribute = (component: ComponentInt, attributes: any) => ({
  type: ADD_ATTRIBUTE,
  payload: {
    component,
    attributes,
  },
});

export const updateAttribute = (queryResult) => ({
  type: UPDATE_ATTRIBUTE,
  payload: queryResult
});

export const deleteAttribute = (component: ComponentInt, attributeKey: string) => ({
  type: DELETE_ATTRIBUTE,
  payload: {
    component,
    attributeKey,
  },
});

export const editCurrentComponent = (component: ComponentInt) => ({
  type: EDIT_CURRENT_COMPONENT,
  payload: component,
});

export const setCurrentComponent = (component: ComponentInt | {}) => ({
  type: SET_CURRENT_COMPONENT,
  payload: component,
});

export const setSelectedComponent = (component: ComponentInt | {}) => ({
  type: SET_SELECTED_COMPONENT,
  payload: component,
});


export const setDirectory = (data: any) => ({
  type: SET_DIRECTORY,
  payload: data,
});

export const setCurrentFile = (data: any) => ({
  type: SET_CURRENT_FILE,
  payload: data,
});

export const setCode = (data: any) => ({
  type: SET_CODE,
  payload: data,
});

export const setResolverCode = (data: any) => ({
  type: SET_RESOLVER_CODE,
  payload: data,
});
