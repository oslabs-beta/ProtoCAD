import configureStore from 'redux-mock-store';
import { deleteComponent } from "../../../client/actions/componentsAction";
import { DELETE_COMPONENT } from '../../../client/actions/types';
import { delComponent, delComponentResult } from "../../fixtures/components/componentsData";

describe('delete component redux', function () {
    const mockStore = configureStore(); // this returns a func mockStore
    const reduxStore = mockStore(); // mock store -> mock state

    beforeEach(() => {
        reduxStore.clearActions();
    });

    describe('delete component action', function () {
        it('should dispatch the create component action', () => {
            const expectedActions = [
                {
                    payload: delComponent,
                    type: DELETE_COMPONENT
                }
            ];
            reduxStore.dispatch(deleteComponent(delComponentResult));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});
