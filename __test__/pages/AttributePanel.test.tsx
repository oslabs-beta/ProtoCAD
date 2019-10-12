import * as React from 'react';
import configureStore from 'redux-mock-store';
import {shallow} from '../setup/test-setup';
import AttributePanel from '../../client/components/AttributePanel';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<AttributePanel />', function () {
    let wrapper: any;
    it('defines component panel component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <AttributePanel dispatch={mockDispatchFn} />
        </Provider>);

        expect(wrapper).toBeDefined();
    });
});