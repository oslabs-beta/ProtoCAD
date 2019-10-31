import * as React from 'react';
import Logo from '../assets/logo.jsx';
import Tabs from './Tabs';

/**
 * ************************************
 *
 * @module  Library
 * @description Functional component that utilizes tabs to
 * either display a list of components or the file structure of a project
 *
 * ************************************
 */
export default () => (
  <div id="library">
    <div id="appName">
      <Logo />
      <h3>ProtoCAD</h3>
    </div>
    <Tabs />
  </div>
);
