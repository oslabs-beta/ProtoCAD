import configureStore from 'redux-mock-store';
import { createComponent } from "../../../client/actions/componentsAction";
import { CREATE_COMPONENT } from '../../../client/actions/types';
import { addComponent, addComponentResult } from "../../fixtures/components/componentsData";

describe('add component redux', function () {
    const mockStore = configureStore(); // this returns a func mockStore
    const reduxStore = mockStore(); // mock store -> mock state

    beforeEach(() => {
        reduxStore.clearActions();
    });

    describe('add component action', function () {
        it('should dispatch the create component action', () => {
            const expectedActions = [
                {
                    payload: addComponent,
                    type: CREATE_COMPONENT
                }
            ];
            reduxStore.dispatch(createComponent(addComponentResult));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});
