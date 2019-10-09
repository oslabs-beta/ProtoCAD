import * as React from 'react';
import Dashboard from './Dashboard';
import Library from "./Library";
import Misc from "./Misc";
import SchemaBoard from "./SchemaBoard";

export default () => <div id={'appContainer'}>
  <Library/>
  <Misc/>
  <Dashboard/>
  <SchemaBoard/>
</div>;