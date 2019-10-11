import { CREATE_COMPONENT, DELETE_COMPONENT, EDIT_CURRENT_COMPONENT, SET_CURRENT_COMPONENT, UPDATE_COMPONENT, ADD_CHILD_COMPONENT, ADD_ATTRIBUTE } from './types';

export const createComponent = data => ({
    type: CREATE_COMPONENT,
    payload: data
});

export const deleteComponent = (node) => ({
    type: DELETE_COMPONENT,
    payload: node
});

export const updateComponent = (parentNode, data) => ({
    type: UPDATE_COMPONENT,
    payload: {
        parentNode,
        data
    }
});

export const addChildComponent = (parentNode, data) => ({
    type: ADD_CHILD_COMPONENT,
    payload: {
        parentNode,
        data
    }
});

export const addAttribute = (selectedNode, attribute) => ({
    type: ADD_ATTRIBUTE,
    payload: {
        selectedNode,
        attribute
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
