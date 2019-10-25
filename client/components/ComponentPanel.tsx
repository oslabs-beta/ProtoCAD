import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteComponent,
    setCurrentComponent,
    addChildComponent,
    setSelectedComponent
} from "../actions/componentsAction";
import { difference, isEmpty } from 'lodash';
import { ComponentInt, GlobalState, AddPanelInt, ComponentPanelInt } from '../utils/InterfaceDefinitions';


const Panel = (props: ComponentInt)  => {
    const current = useSelector((state: GlobalState) => state.current.data);
    const dispatch = useDispatch();

    // deletes component
    const onButtonClick = () => {
        dispatch(deleteComponent(props));
    };

    // sets component as the target view
    const onClick = () => {
        dispatch(setCurrentComponent(props));
    };

    // displays single component block on component list
    return <div className={`panel ${current.name === props.name ? 'currentPanel' : ''}`} onClick={onClick}>
        <h4>{props.name}</h4>
        <button onClick={onButtonClick}>X</button>
    </div>
};


const AddPanel = (props: AddPanelInt) => {
    const dispatch = useDispatch();
    const selected = useSelector((state: GlobalState) => state.selected.data);

    // adds a child component to a selected component
    const onClick = () => {
        dispatch(addChildComponent(selected, props.data));
        props.handleClose();
    };

    return <div className={`panel`} onClick={onClick}>
        <h4>{props.name}</h4>
        <div>+</div>
    </div>
};


export default (props: ComponentPanelInt) => {
    // useSelector grabs redux state and selects components.data value and returns
    const current = useSelector((state: GlobalState) => state.current.data);
    const components = useSelector((state: GlobalState) => state.components.data);
    const selected = useSelector((state: GlobalState) => state.selected.data);

    const dispatch = useDispatch();

    const [filtered, setFiltered] = React.useState(components);

    React.useEffect(() => {
        if (isEmpty(selected)) return;

        const selectedName = selected.name;
        const selectedNode = components.filter((item: ComponentInt) => item.name === selectedName)[0];
        const selectedChildrenName = selectedNode.children.map((item: ComponentInt) => item.name);
        const used = [selectedName, ...selectedChildrenName];
        let filteredName = difference(components.map((item: ComponentInt) => item.name), used);

        let parent = selected.parent;
        while (!isEmpty(parent)) {
            filteredName = filteredName.filter((name: string) => name !== parent.name);
            parent = parent.parent;
        }

        setFiltered(components.filter((item: ComponentInt) => filteredName.includes(item.name)));

    }, [selected]);

    React.useEffect(() => {
        const updated = components.filter((item: ComponentInt) => item.name === current.name);
        if (updated.length > 0) dispatch(setCurrentComponent(updated[0]));
    }, [components]);

    React.useEffect(() => {
        const find = (component: ComponentInt) => {
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
            filtered.map((info) => <AddPanel key={info.name} data={info} {...info} handleClose={props.handleClose} />) : components.map((info) => <Panel key={info.name} {...info} />)
        }
    </div>;
};
