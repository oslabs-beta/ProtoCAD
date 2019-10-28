import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { GlobalState } from '../utils/InterfaceDefinitions';

declare const window: any;
const { ipcRenderer } = window;

/**
 * ************************************
 *
 * @module  Misc
 * @description Presentation component that displays buttons
 *
 * ************************************
 */
export default () => {
  const components = useSelector((state: GlobalState) => state.components.data);
  const directory = useSelector((state: GlobalState) => state.directory.data);
  const code = useSelector((state: GlobalState) => state.code.data);

  // Converts components data into a GraphQL schema
  const onClick = () => {
    ipcRenderer.send('schema', components);
  };

  // Sends component data to Apollo
  const onConvert = () => {
    ipcRenderer.send('editor', {
      path: directory.root.path,
      data: code,
    });
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
    </div>
  );
};
