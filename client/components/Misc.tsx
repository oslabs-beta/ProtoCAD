import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';


declare const window: any;
const ipcRenderer = window.ipcRenderer;


export default props => {

  const components = useSelector(state => state.components.data);

  const onClick = () => {
      ipcRenderer.send('schema', components);
  };

  React.useEffect(() => {
  },[]);

   return <div id={'misc'}>
      <Button
        variant="contained"
        size="small"
        id="exportButton"
        onClick={onClick}>
          Convert to GraphQL
      </Button>
   </div>;
};
