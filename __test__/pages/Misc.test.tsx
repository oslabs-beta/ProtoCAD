import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import Misc from '../../client/components/Misc';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<Misc />', function () {
    let wrapper: any;
    it('defines misc component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <Misc dispatch={mockDispatchFn} />
        </Provider>);
        expect(wrapper).toBeDefined();
    });
});
