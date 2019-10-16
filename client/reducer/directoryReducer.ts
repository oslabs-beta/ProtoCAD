import {
    SET_DIRECTORY,
    SET_CURRENT_FILE
} from '../actions/types';
const defaultState = {
    loading: false,
    error: null,
    data: {
        root: '',
        file: ''
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_DIRECTORY:
            return {
                ...state,
                data: {
                    ...state.data,
                    root: action.payload
                }
            };
        case SET_CURRENT_FILE:
            return {
                ...state,
                data: {
                    ...state.data,
                    file: action.payload
                }
            };
        default:
            return state;
    }
};