import currentComponentReducer from "../../../client/reducer/currentComponentReducer";
import { SET_CURRENT_COMPONENT, EDIT_CURRENT_COMPONENT } from '../../../client/actions/types';

describe('Current Component Reducer', function () {
    beforeEach(() => {
    });

    it('expected state when setting current component', () => {
        const action = {
            type: SET_CURRENT_COMPONENT,
            payload: {
                name: 'C1',
                attributes: {
                  'id': 'ID',
                  'name': 'String'
                },
                parent: {},
                children: []
            }
        };
        const updatedState = currentComponentReducer(undefined, action);
        expect(true).toBeTruthy();
        expect(updatedState.data).toHaveProperty('name', 'C1');
        expect(updatedState.data.attributes).toHaveProperty('name', 'String');
    });

    it('expected state when editing current component', () => {
        const action = {
            type: EDIT_CURRENT_COMPONENT,
            payload: {
              name: 'Root',
              attributes: {
                'id': 'ID',
                'age': 'Int'
              },
              parent: {},
              children: []
            }
        };
        const updatedState = currentComponentReducer(undefined, action);
        expect(true).toBeTruthy();
        expect(updatedState.data).toHaveProperty('name', 'Root');
        expect(updatedState.data.attributes).toHaveProperty('age', 'Int');
    });

    it('expected default state', () => {
      const defaultState = {
          error: null,
          loading: null,
          data: {
              name: 'Root',
              attributes: {
                'id': 'ID'
              },
              parent: {},
              children: []
          }
      };
        const updatedState = currentComponentReducer(defaultState, {});
        expect(updatedState.data).toHaveProperty('name', 'Root');
    });


});
