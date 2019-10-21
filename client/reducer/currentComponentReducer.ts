import * as types from '../actions/types';
import {
  CurrentComponentStateInt
} from '../utils/InterfaceDefinitions';


const defaultState: CurrentComponentStateInt = {
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

export default (state: any = defaultState, action: any) => {
    switch (action.type) {
        case types.SET_CURRENT_COMPONENT:
            return {
                ...state,
                data: action.payload
            };
        case types.EDIT_CURRENT_COMPONENT:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
