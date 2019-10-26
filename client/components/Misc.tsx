import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { GlobalState } from '../utils/InterfaceDefinitions';

declare const window: any;
const { ipcRenderer } = window;


export default (props) => {
  const components = useSelector((state: GlobalState) => state.components.data);
  const directory = useSelector((state: GlobalState) => state.directory.data);
  const code = useSelector((state: GlobalState) => state.code.data);
  const resolverCode = useSelector((state: GlobalState) => state.resolver.data);

  const onClick = () => {
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

  const onResolver = () => {
    ipcRenderer.send('resolver', {
      path: directory.root.path,
      data: resolverCode,
    });
    props.sendQueries();
  };

  return (
    <div id="misc">
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
      <Button
        variant="contained"
        size="small"
        id="resolver"
        onClick={onResolver}
      >
           Save code
      </Button>
    </div>
  );
};
