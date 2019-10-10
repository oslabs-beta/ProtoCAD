import * as React from 'react';
import { useSelector } from 'react-redux';


export default props => {

  const components = useSelector(state => state.components.data);

  const onClick = () => {
      console.log(components)
  };

   return <div id={'misc'}>
    <button onClick={onClick}>Export Schema</button>
   </div>;
};
