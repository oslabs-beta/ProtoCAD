import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import Library from '../../client/components/Library';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<Library />', function () {
    let wrapper: any;
    it('defines library component', () => {
        wrapper = shallow(<Provider store={mockStore({})}><Library /></Provider>);
        expect(wrapper).toBeDefined();
    });
});
