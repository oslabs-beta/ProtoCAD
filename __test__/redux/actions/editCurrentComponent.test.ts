import configureStore from 'redux-mock-store';
import { editCurrentComponent } from "../../../client/actions/componentsAction";
import { EDIT_CURRENT_COMPONENT } from '../../../client/actions/types';
import { editcurrentComponent, editcurrentComponentResult } from "../../fixtures/components/componentsData";

describe('edit current component redux', function () {
    const mockStore = configureStore(); // this returns a func mockStore
    const reduxStore = mockStore(); // mock store -> mock state

    beforeEach(() => {
        reduxStore.clearActions();
    });

    describe('edit current component action', function () {
        it('should dispatch the create component action', () => {
            const expectedActions = [
                {
                    payload: editcurrentComponent,
                    type: EDIT_CURRENT_COMPONENT
                }
            ];
            reduxStore.dispatch(editCurrentComponent(editcurrentComponentResult));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});