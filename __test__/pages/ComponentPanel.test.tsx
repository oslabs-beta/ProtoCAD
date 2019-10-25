import * as React from 'react';
import configureStore from 'redux-mock-store';
import {shallow} from '../setup/test-setup';
import ComponentPanel from '../../client/components/ComponentPanel';
import { ComponentPanelInt } from '../../client/utils/InterfaceDefinitions';
import { Provider } from 'react-redux';

const mockStore = configureStore();
const mockDispatchFn = jest.fn();

describe('<ComponentPanel />', function () {

    let wrapper: any;
    const props: ComponentPanelInt = {
      modal: true,
      handleClose: jest.fn()
    }

    it('defines component panel component', () => {
        wrapper = shallow(<Provider store={mockStore({})}>
            <ComponentPanel {...props} />
        </Provider>);

        expect(wrapper).toBeDefined();
    });
});
