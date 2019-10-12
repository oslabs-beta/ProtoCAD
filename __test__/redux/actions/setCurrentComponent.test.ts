import configureStore from 'redux-mock-store';
import { setCurrentComponent } from "../../../client/actions/componentsAction";
import { SET_CURRENT_COMPONENT } from '../../../client/actions/types';
import { setcurrentComponent, setcurrentComponentResult } from "../../fixtures/components/componentsData";

describe('set current component redux', function () {
    const mockStore = configureStore(); // this returns a func mockStore
    const reduxStore = mockStore(); // mock store -> mock state

    beforeEach(() => {
        reduxStore.clearActions();
    });

    describe('set current component action', function () {
        it('should dispatch the create component action', () => {
            const expectedActions = [
                {
                    payload: setcurrentComponent,
                    type: SET_CURRENT_COMPONENT
                }
            ];
            reduxStore.dispatch(setCurrentComponent(setcurrentComponentResult));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});