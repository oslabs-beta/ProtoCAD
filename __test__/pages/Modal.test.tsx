import * as React from 'react';
import * as Enzyme from 'enzyme';
const { shallow, mount, render } = Enzyme;
import * as Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });


import MyModal from '../../client/components/Modal.jsx';
import ComponentPanel from '../../client/components/ComponentPanel';
import { Provider } from 'react-redux';

const mockStore = configureStore();
const mockDispatchFn = jest.fn();

describe('<Modal />', function () {
    let wrapper: any;
    it('defines modal component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <MyModal dispatch={mockDispatchFn} />
        </Provider>);
        expect(wrapper).toBeDefined();
    });
});
