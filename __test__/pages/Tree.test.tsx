import * as React from 'react';
import configureStore from 'redux-mock-store';
import {shallow} from '../setup/test-setup';
import Tree from '../../client/components/Tree';
import { Provider } from 'react-redux';
import { staticComponent } from '../fixtures/components/componentsData';

const mockStore = configureStore();
const mockDispatchFn = jest.fn();
const components = staticComponent;
const current = staticComponent;

describe('<Tree />', function () {
    let wrapper: any;
    it('defines tree component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <Tree components={components} current={current} />
        </Provider>);

        expect(wrapper).toBeDefined();
    });
});
