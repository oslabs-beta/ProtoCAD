import * as React from 'react';
import { useSelector } from 'react-redux';

declare const window: any;

const ipcRenderer = window.ipcRenderer;


export default props => {

  const components = useSelector(state => state.components.data);

  const onClick = () => {
      console.log(components)
      ipcRenderer.send('schema', components);
  };

   return <div id={'misc'}>
    <button onClick={onClick}>Export Schema</button>
   </div>;
};
