import currentComponentReducer from "../../../client/reducer/currentComponentReducer";
import { SET_CURRENT_COMPONENT, EDIT_CURRENT_COMPONENT } from '../../../client/actions/types';

describe('Current Component Reducer', function () {

  const initialData = {
    error: null,
    loading: null,
    data: {
      name: 'Root',
      attributes: {
        'id': 'ID',
        'age': 'Int'
      },
      parent: {},
      children: []
    }
  }

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
        const updatedState = currentComponentReducer(initialData, action);
        expect(true).toBeTruthy();
        expect(updatedState.data).toHaveProperty('name', 'C1');
        expect(updatedState.data.attributes).toHaveProperty('name', 'String');
    });

    it('expected state when editing current component', () => {
        const action = {
            type: EDIT_CURRENT_COMPONENT,
            payload: {
              name: 'C2',
              attributes: {
                'id': 'ID',
                'age': 'Int'
              },
              parent: {},
              children: []
            }
        };
        const updatedState = currentComponentReducer(initialData, action);
        expect(true).toBeTruthy();
        expect(updatedState.data).toHaveProperty('name', 'C2');
        expect(updatedState.data.attributes).toHaveProperty('age', 'Int');
    });

    it('expected default state', () => {
        const updatedState = currentComponentReducer(initialData, {});
        expect(updatedState.data).toHaveProperty('name', 'Root');
    });


});
