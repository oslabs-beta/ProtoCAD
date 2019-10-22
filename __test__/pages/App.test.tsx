import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import App from '../../client/components/App';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const mockDispatchFn = jest.fn();

describe('<App />', function () {
    let wrapper: any;
    it('defines the component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <App dispatch={mockDispatchFn} />
        </Provider>);
        expect(wrapper).toBeDefined();
    });
});
