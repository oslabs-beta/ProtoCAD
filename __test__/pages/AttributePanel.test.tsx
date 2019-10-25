import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount } from '../setup/test-setup';
import AttributePanel from '../../client/components/AttributePanel';
import { Provider } from 'react-redux';

const mockStore = configureStore();
const mockDispatchFn = jest.fn();

describe('<AttributePanel />', function () {

    let wrapper: any;
    const props = {
      modal: true,
      handleClose: jest.fn()
    };

    const modal = true;

    beforeAll(() => {
      wrapper = shallow(<Provider store={mockStore({})}>
          <AttributePanel {...props} />
      </Provider>).dive();
    });

    it('defines component panel component', () => {
        expect(wrapper).toBeDefined();
    });

    it('defines components expected modal property', () => {
       expect((wrapper).prop('modal')).toEqual(true);
    });

    it('defines components expected handleClose property', () => {
      // expect(wrapper.find('attribute-form')).toExist();
      expect(wrapper.find('attribute-form')).toBe(true);
      // expect(wrapper.hasClass('attribute-form')).toExists();
       // wrapper.find('button').simulate('click')
       // expect(wrapper.props.handleClose).toHaveBeenCalledTimes(1)
    });
});
