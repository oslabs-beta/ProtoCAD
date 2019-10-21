import * as types from '../actions/types';
import { DirectoryStateInt } from '../utils/InterfaceDefinitions';

const defaultState: DirectoryStateInt = {
    loading: false,
    error: null,
    data: {
        root: '',
        file: ''
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_DIRECTORY:
            return {
                ...state,
                data: {
                    ...state.data,
                    root: action.payload
                }
            };
        case types.SET_CURRENT_FILE:
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
