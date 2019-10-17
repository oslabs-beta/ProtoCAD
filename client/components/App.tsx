import * as React from 'react';
import Dashboard from './Dashboard';
import Library from "./Library";
import Misc from "./Misc";
import SchemaBoard from "./SchemaBoard.jsx";
import FileTree from './FileTree.jsx';

export default props => <div id={'appContainer'}>
  <Library/>
  <Misc/>
  <Dashboard/>
  <SchemaBoard/>
  <FileTree />
</div>;