import componentsReducer from "../../../client/reducer/componentsReducer";
import { addComponent } from '../../fixtures/components/componentsData';
import { CREATE_COMPONENT } from '../../../client/actions/types';

describe('Components Reducer', function () {
    beforeEach(() => {

    });
    it('components reducer expected state', () => {
        const action = {
            payload: addComponent,
            type: CREATE_COMPONENT
        };
        const updatedState = componentsReducer(undefined, action);

        expect(updatedState.data).toHaveLength(2);
        expect(updatedState.data[0]).toEqual({
            name: 'Root',
            attributes: { id: 'ID' },
            parent: {},
            children: []
        });
        expect(updatedState.data[1]).toEqual(addComponent);
    });
});