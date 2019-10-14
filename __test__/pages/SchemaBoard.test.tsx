import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import SchemaBoard from '../../client/components/SchemaBoard.jsx';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<SchemaBoard />', function () {
    let wrapper: any;
    it('defines schema board component', () => {
        wrapper = shallow(<Provider store={mockStore({})}><SchemaBoard dispatch={mockDispatchFn} /></Provider>);
        expect(wrapper).toBeDefined();
    });
});