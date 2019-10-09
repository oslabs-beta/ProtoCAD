import * as React from 'react';
import ComponentPanel from "./ComponentPanel";
import { createComponent, setCurrentComponent } from '../actions/componentsAction';
import { useSelector, useDispatch } from 'react-redux';

export default props => {
    // input value
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();
    // useSelector grabs redux state and selects components.data value and returns
    const components = useSelector(state => state.components.data);

    const onClick = () => {
        if (components.every(data => data.name !== value)) {
            const obj = {
                name: value,
                attributes: {},
                children: []
            };
            dispatch(createComponent(obj));
            dispatch(setCurrentComponent(obj));
        }
        setValue('');
    };
    return <div id={'library'}>
        <input name={'nameInput'} type={'text'} value={value} placeholder={'Component Name'} onChange={e => setValue(e.target.value)}/>
        <button onClick={onClick}>Submit</button>
        <ComponentPanel />
    </div>
};