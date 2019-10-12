import configureStore from 'redux-mock-store';
import { setSelectedComponent } from "../../../client/actions/componentsAction";
import { SET_SELECTED_COMPONENT } from '../../../client/actions/types';
import { setselectedComponent, setselectedComponentResult } from "../../fixtures/components/componentsData";

describe('set selected component redux', function () {
    const mockStore = configureStore(); // this returns a func mockStore
    const reduxStore = mockStore(); // mock store -> mock state

    beforeEach(() => {
        reduxStore.clearActions();
    });

    describe('set selected component action', function () {
        it('should dispatch the create component action', () => {
            const expectedActions = [
                {
                    payload: setselectedComponent,
                    type: SET_SELECTED_COMPONENT
                }
            ];
            reduxStore.dispatch(setSelectedComponent(setselectedComponentResult));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});