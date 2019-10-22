import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import Tree from '../../client/components/Tree';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<Tree />', function () {
    let wrapper: any;
    it('defines tree component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <Tree dispatch={mockDispatchFn} />
        </Provider>);
        expect(wrapper).toBeDefined();
    });
});
