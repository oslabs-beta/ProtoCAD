import * as React from 'react';
import configureStore from 'redux-mock-store';
import {shallow, mount} from '../setup/test-setup';
import AttributePanel from '../../client/components/AttributePanel';
import { Provider } from 'react-redux';
declare const expect: jest.Expect


const mockStore = configureStore();
const mockDispatchFn = jest.fn();

describe('<AttributePanel />', function () {

    const props = {
      modal: true,
      handleClose: jest.fn()
    }
    let wrapper: any;

    wrapper = shallow(<Provider store={mockStore({})}>
      <AttributePanel {...props} dispatch={mockDispatchFn} />
      </Provider>).dive();

    it('defines component panel component', () => {
        console.log(wrapper.debug())
        expect(wrapper).toBeDefined();
    });

    it('defines components expected modal property', () => {
       expect((wrapper).prop('modal')).toEqual(true);
       // wrapper.find('button').simulate('click');
       // expect(props.handleClose).toHaveBeenCalled();
    });

});
