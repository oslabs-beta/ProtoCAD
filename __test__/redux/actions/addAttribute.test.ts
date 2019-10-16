import configureStore from 'redux-mock-store';
import { addAttribute } from "../../../client/actions/componentsAction";
import { ADD_ATTRIBUTE} from '../../../client/actions/types';
import { addAttributesComponent, addAttributesResult } from "../../fixtures/components/componentsData";

describe('addchild component redux', function () {
    const mockStore = configureStore(); // this returns a func mockStore
    const reduxStore = mockStore(); // mock store -> mock state

    beforeEach(() => {
        reduxStore.clearActions();
    });

    describe('addchild component action', function () {
        it('should dispatch the create component action', () => {
            const expectedActions = [
                {
                    payload: addAttributesComponent,
                    type: ADD_ATTRIBUTE
                }
            ];
            reduxStore.dispatch(addAttribute(addAttributesResult.selectedComponent, addAttributesResult.attributes));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});