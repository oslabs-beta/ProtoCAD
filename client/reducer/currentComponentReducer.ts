import { SET_CURRENT_COMPONENT, EDIT_CURRENT_COMPONENT } from '../actions/types';

const defaultState = {
    error: null,
    loading: null,
    data: {
      name: 'School',
      attributes: {
        'id': 'ID',
        'name': 'String',
      },
      parent: {},
      children: [{
        name: 'Student',
        attributes: {
          'id': 'ID',
          'name': 'String',
          'cohort': 'Int',
        },
        parent: {},
        children: []
      },
      {
        name: 'Fellow',
        attributes: {
          'id': 'ID',
          'name': 'String',
          'cohort': 'Int',
        },
        parent: {},
        children: []
      },
      {
        name: 'Instructor',
        attributes: {
          'id': 'ID',
          'name': 'String',
        },
        parent: {},
        children: []
      }]
    }
};

export default (state: any = defaultState, action) => {
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
