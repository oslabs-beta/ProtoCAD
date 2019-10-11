import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {deleteComponent, setCurrentComponent, updateComponent, addChildComponent} from "../actions/componentsAction";
import { difference } from 'lodash';

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

   const onClick = () => {
      dispatch(addChildComponent(props.selectedNode, props.data));
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
   const dispatch = useDispatch();

   const [filtered, setFiltered] = React.useState(components);

   React.useEffect(() => {
     if (!props.selectedNode) return;

     const selectedName = props.selectedNode.name;
     const selectedNode = components.filter(item => item.name === selectedName)[0];
     const selectedChildrenName = selectedNode.children.map(item => item.name);
     const used = [selectedName, ...selectedChildrenName];
     const filtedName = difference(components.map(item => item.name), used);

     setFiltered(components.filter(item => filtedName.includes(item.name)));

   }, [props.selectedNode]);


   const [index, setIndex] = React.useState(0);

   const setNext = i => setIndex(i);

   React.useEffect(() => {
     const component = components[index];
     dispatch(setCurrentComponent(component || {}));
   }, [components]);

   return <div id={'componentPanel'}>
      {  props.modal ?
          filtered.map((info, i) => <AddPanel key={info.name} data={info} {...info} selectedNode={props.selectedNode} handleClose={props.handleClose} />) : components.map((info, i) => <Panel key={info.name} {...info} index={i} />)
      }
   </div>;
};
