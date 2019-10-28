import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import Dashboard from '../../client/components/Dashboard';
import { Provider } from 'react-redux';

const mockStore = configureStore();
const mockDispatchFn = jest.fn();

describe('<Dashboard />', function () {
    let wrapper: any;
    it('defines dashboard component', () => {
        wrapper = shallow(<Provider store={mockStore({})}><Dashboard /></Provider>)
        expect(wrapper).toBeDefined();
    });
});
