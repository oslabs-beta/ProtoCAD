import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { GlobalState } from '../utils/InterfaceDefinitions';

declare const window: any;
const { ipcRenderer } = window;


export default props => {
  const components = useSelector(state => state.components.data);
  const directory = useSelector(state => state.directory.data);
  const code = useSelector(state => state.code.data);
  // const resolverCode = useSelector(state => state.resolver.data);

  const onClick = () => {
    console.log(components);
    ipcRenderer.send('schema', components);
  };

  React.useEffect(() => {
  }, []);

  const onConvert = () => {
    ipcRenderer.send('editor', {
      path: directory.root.path,
      data: code,
    });
  };

   return <div id={'misc'}>
      <Button
        variant="contained"
        size="small"
        id="exportButton"
        onClick={onClick}
      >
          Convert to GraphQL
      </Button>
      <Button
        variant="contained"
        size="small"
        id="apollo"
        onClick={onConvert}
      >
           Convert to Apollo
       </Button>
   </div>;
};
