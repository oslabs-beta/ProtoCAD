import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteComponent,
    setCurrentComponent,
    updateComponent,
    addChildComponent,
    setSelectedComponent
} from "../actions/componentsAction";
import { difference, isEmpty } from 'lodash';

const Panel = props => {
    const current = useSelector(state => state.current.data);
    const dispatch = useDispatch();

    const onButtonClick = () => {
        dispatch(deleteComponent(props));
    };

    const onClick = () => {
        dispatch(setCurrentComponent(props));
    };

    return <div className={`panel ${current.name === props.name ? 'currentPanel' : ''}`} onClick={onClick}>
        <h4>{props.name}</h4>
        <button onClick={onButtonClick}>X</button>
    </div>
};

const AddPanel = props => {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.selected.data);

    const onClick = () => {
        dispatch(addChildComponent(selected, props.data));
        props.handleClose();
    };

    return <div className={`panel`} onClick={onClick}>
        <h4>{props.name}</h4>
        <div>+</div>
    </div>
};

export default props => {
    // useSelector grabs redux state and selects components.data value and returns
    const current = useSelector(state => state.current.data);
    const components = useSelector(state => state.components.data);
    const selected = useSelector(state => state.selected.data);

    const dispatch = useDispatch();

    const [filtered, setFiltered] = React.useState(components);

    React.useEffect(() => {
        if (isEmpty(selected)) return;

        const selectedName = selected.name;
        const selectedNode = components.filter(item => item.name === selectedName)[0];
        const selectedChildrenName = selectedNode.children.map(item => item.name);
        const used = [selectedName, ...selectedChildrenName];
        let filteredName = difference(components.map(item => item.name), used);

        let parent = selected.parent;
        while (!isEmpty(parent)) {
            filteredName = filteredName.filter(name => name !== parent.name);
            parent = parent.parent;
        }

        setFiltered(components.filter(item => filteredName.includes(item.name)));

    }, [selected]);

    React.useEffect(() => {
        const updated = components.filter(item => item.name === current.name);
        if (updated.length > 0) dispatch(setCurrentComponent(updated[0]));
    }, [components]);

    React.useEffect(() => {
        const find = component => {
            if (component.name === selected.name) {
                return component;
            }
            else {
                component.children.forEach(item => {
                    const found = find(item);
                    if (found) dispatch(setSelectedComponent(found))
                });
                return undefined;
            }
        };
        find(current);
    }, [current]);

    return <div id={'componentPanel'}>
        {  props.modal ?
            filtered.map((info, i) => <AddPanel key={info.name} data={info} {...info} handleClose={props.handleClose} />) : components.map((info, i) => <Panel key={info.name} {...info} />)
        }
    </div>;
};
