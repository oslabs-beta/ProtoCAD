import * as React from 'react';
import { setCurrentComponent } from '../actions/componentsAction';
import { useSelector, useDispatch } from 'react-redux';
import Tree from './Tree';

export default props => {

  const components = useSelector(state => state.components.data);
  const current = useSelector(state => state.current.data);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const newComponent = components.filter(item => item.name === current.name);
    if (newComponent.length > 0) dispatch(setCurrentComponent(newComponent[0]));
  }, [components]);
  return <div id={'dashboard'}>
    <Tree />
  </div>
};