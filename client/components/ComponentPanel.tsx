import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { difference, isEmpty } from 'lodash';
import {
  deleteComponent,
  setCurrentComponent,
  addChildComponent,
  setSelectedComponent,
} from '../actions/componentsAction';
import {
  ComponentInt, GlobalState, AddPanelInt, ComponentPanelInt,
} from '../utils/InterfaceDefinitions';

/**
 * ************************************
 *
 * @module  Panel
 * @description Functional component that renders a single component
 *
 * ************************************
 */
const Panel = (props: ComponentInt) => {
  const { name } = props;
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
  return (
    <div className={`panel ${current.name === name ? 'currentPanel' : ''}`} onClick={onClick}>
      <h4>{name}</h4>
      <button onClick={onButtonClick}>X</button>
    </div>
  );
};

/**
 * ************************************
 *
 * @module  AddPanel
 * @description Functional component that displays all available components
 * that a parent component can select
 *
 * ************************************
 */
const AddPanel = (props: AddPanelInt) => {
  const { name, handleClose, data } = props;
  const dispatch = useDispatch();
  const selected = useSelector((state: GlobalState) => state.selected.data);

  // adds a child component to a selected component
  const onClick = () => {
    dispatch(addChildComponent(selected, data));
    handleClose();
  };

  return (
    <div className="panel" onClick={onClick}>
      <h4>{name}</h4>
      <div>+</div>
    </div>
  );
};

/**
 * ************************************
 *
 * @module  ComponentPanel
 * @description Functional component that will either display a AddPanel or Panel component
 *
 * ************************************
 */
export default (props: ComponentPanelInt) => {
  // useSelector grabs redux state and selects components.data value and returns
  const { handleClose, modal } = props;
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

    let { parent } = selected;
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

      component.children.forEach((item) => {
        const found = find(item);
        if (found) dispatch(setSelectedComponent(found));
      });
      return undefined;
    };
    find(current);
  }, [current]);


/// ATTN: BEN - Explain this below, should we separate into other files
  return (
    <div id="componentPanel">
      { modal
        ? filtered.map((info) => <AddPanel key={info.name} data={info} {...info} handleClose={handleClose} />) : components.map((info) => <Panel key={info.name} {...info} />)}
    </div>
  );
};
