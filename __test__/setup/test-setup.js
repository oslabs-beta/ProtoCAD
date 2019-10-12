import * as Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

export { shallow, mount, render };

export default Enzyme;