import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from '../setup/test-setup';
import MyModal from '../../client/components/Modal';
import { Provider } from 'react-redux';

const mockStore = configureStore();
const mockDispatchFn = jest.fn();

describe('<Modal />', function () {

    interface Props {
      open: boolean,
      handleClose: () => void,
      y: string,
      x: string
    }

    const props: Props = {
      open: true,
      handleClose: jest.fn(),
      y: '50',
      x: '50',
    }

    let wrapper: any;
    it('defines modal component', () => {
        wrapper = shallow(<Provider store={mockStore({})}><MyModal {...props} /></Provider>);
        expect(wrapper).toBeDefined();
    });
});
