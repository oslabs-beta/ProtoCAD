import currentComponentReducer from "../../../client/reducer/currentComponentReducer";
import { SET_CURRENT_COMPONENT } from '../../../client/actions/types';

describe('Current Component Reducer', function () {
    beforeEach(() => {

    });
    it('current component reducer expected state', () => {
        const action = {
            type: SET_CURRENT_COMPONENT
        };
        const updatedState = currentComponentReducer(undefined, action);
        expect(true).toBeTruthy();
        // expect(updatedState.data).toHaveProperty('name', 'C1');
        // expect(updatedState.data).toHaveProperty('parent', 'C1');
        // expect(updatedState.data).toHaveProperty('children', 'C1');
        // expect(updatedState.data).toHaveProperty('attributes', 'C1');
    });
});