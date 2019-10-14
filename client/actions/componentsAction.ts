import {
    CREATE_COMPONENT,
    DELETE_COMPONENT,
    UPDATE_COMPONENT,
    ADD_CHILD_COMPONENT,
    ADD_ATTRIBUTE,
    EDIT_CURRENT_COMPONENT,
    SET_CURRENT_COMPONENT,
    DELETE_ATTRIBUTE,
    SET_SELECTED_COMPONENT
} from './types';

export const createComponent = data => ({
    type: CREATE_COMPONENT,
    payload: data
});

export const deleteComponent = (node) => ({
    type: DELETE_COMPONENT,
    payload: node
});

export const updateComponent = data => ({
    type: UPDATE_COMPONENT,
    payload: data
});

export const addChildComponent = (parentComponent, data) => ({
    type: ADD_CHILD_COMPONENT,
    payload: {
        parentComponent,
        data
    }
});

export const addAttribute = (selectedComponent, attributes) => ({
    type: ADD_ATTRIBUTE,
    payload: {
        selectedComponent,
        attributes
    }
});

export const deleteAttribute = (selectedComponent, attributeKey) => ({
  type: DELETE_ATTRIBUTE,
  payload: {
      selectedComponent,
      attributeKey
  }
})

export const editCurrentComponent = data => ({
    type: EDIT_CURRENT_COMPONENT,
    payload: data
});

export const setCurrentComponent = data => ({
    type: SET_CURRENT_COMPONENT,
    payload: data
});

// Selected Component Actions
export const setSelectedComponent = data => ({
    type: SET_SELECTED_COMPONENT,
    payload: data
});
