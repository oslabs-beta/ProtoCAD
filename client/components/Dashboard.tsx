import * as React from 'react';
import { setCurrentComponent } from '../actions/componentsAction';
import { useSelector, useDispatch } from 'react-redux';
import { ComponentInt, GlobalState } from '../utils/InterfaceDefinitions';
import Tree from './Tree';


/**
 * Dashboard Component
 *
 * @param {null} props
 *
 * @return {} Tree Component
 */
export default props => {

  const components = useSelector((state: GlobalState) => state.components.data);
  const current = useSelector((state: GlobalState) => state.current.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const newComponent = components.filter((item: ComponentInt) => item.name === current.name);
    if (newComponent.length > 0) dispatch(setCurrentComponent(newComponent[0]));
    else if (components.length > 0) {
      dispatch(setCurrentComponent(components[0]));
    } else {
      dispatch(setCurrentComponent({}));
    }
  }, [components]);
  return <div id={'dashboard'}>
    <Tree />
  </div>
};
