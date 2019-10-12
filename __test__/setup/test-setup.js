import * as Enzyme from 'enzyme';
const { shallow, mount, render } = Enzyme;
import * as Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

export { shallow, mount, render };

export default Enzyme;