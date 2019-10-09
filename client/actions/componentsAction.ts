import { CREATE_COMPONENT, DELETE_COMPONENT, EDIT_CURRENT_COMPONENT, SET_CURRENT_COMPONENT, UPDATE_COMPONENT } from './types';

export const createComponent = data => ({
    type: CREATE_COMPONENT,
    payload: data
});

export const deleteComponent = name => ({
    type: DELETE_COMPONENT,
    payload: name
});

export const updateComponent = (parentName, data) => ({
    type: UPDATE_COMPONENT,
    payload: {
        parentName,
        data
    }
});

export const editCurrentComponent = data => ({
    type: EDIT_CURRENT_COMPONENT,
    payload: data
});

export const setCurrentComponent = data => ({
    type: SET_CURRENT_COMPONENT,
    payload: data
});