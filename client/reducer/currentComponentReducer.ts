import { SET_CURRENT_COMPONENT, EDIT_CURRENT_COMPONENT } from '../actions/types';

const defaultState = {
    error: null,
    loading: null,
    data: {
        name: 'Root',
        attributes: {},
        children: []
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_COMPONENT:
            return {
                ...state,
                data: action.payload
            };
        case EDIT_CURRENT_COMPONENT:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
