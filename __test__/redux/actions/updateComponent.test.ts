import configureStore from 'redux-mock-store';
import { updateComponent } from "../../../client/actions/componentsAction";
import { UPDATE_COMPONENT } from '../../../client/actions/types';
import { updatesComponent, updatesResult } from "../../fixtures/components/componentsData";

describe('update component redux', function () {
    const mockStore = configureStore(); // this returns a func mockStore
    const reduxStore = mockStore(); // mock store -> mock state

    beforeEach(() => {
        reduxStore.clearActions();
    });

    describe('update component action', function () {
        it('should dispatch the create component action', () => {
            const expectedActions = [
                {
                    payload: updatesComponent,
                    type: UPDATE_COMPONENT
                }
            ];
            reduxStore.dispatch(updateComponent(updatesResult));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});