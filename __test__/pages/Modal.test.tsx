import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import MyModal from '../../client/components/Modal.jsx';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<Modal />', function () {
    let wrapper: any;
    it('defines modal component', () => {
        wrapper = shallow(<Provider store={mockStore({})}><MyModal dispatch={mockDispatchFn} /></Provider>);
        expect(wrapper).toBeDefined();
    });
});