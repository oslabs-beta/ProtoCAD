import configureStore from 'redux-mock-store';
import { addChildComponent } from "../../../client/actions/componentsAction";
import { ADD_CHILD_COMPONENT } from '../../../client/actions/types';
import { addchildComponent, addchildResult } from "../../fixtures/components/componentsData";

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
                  payload: addchildComponent,
                  type: ADD_CHILD_COMPONENT
                }
            ];
            reduxStore.dispatch(addChildComponent(
              addchildResult.parentComponent,
              addchildResult.child
            ));

            expect(reduxStore.getActions()).toEqual(expectedActions);
        });
    });
});
