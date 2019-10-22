import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import ComponentPanel from '../../client/components/ComponentPanel';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<ComponentPanel />', function () {
    let wrapper: any;
    it('defines component panel component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <ComponentPanel dispatch={mockDispatchFn} />
        </Provider>);
        expect(wrapper).toBeDefined();
    });
});
