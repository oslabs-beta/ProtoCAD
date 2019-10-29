import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import Library from './Library';
import Editor from './Editor';
import {setDirectory, setCode, updateAttribute} from '../actions/componentsAction';
import { GlobalState } from '../utils/InterfaceDefinitions';

// accessing ipcRenderer from electron based on preload.js
// @ts-ignore
const { ipcRenderer } = window;

/**
 * ************************************
 *
 * @module  App
 * @description Component that holds all dashboard components
 *
 * ************************************
 */

export default () => {
  const dispatch = useDispatch();
  const directory = useSelector((state: GlobalState) => state.directory.data);

  // event listeners from main process (electron)

  // uses electron to get path to the directory
  ipcRenderer.on('newProject', (error, data) => {
    if (data.hasOwnProperty('path')) dispatch(setDirectory(data));
  });

  // uses bfs to traverse through directory
  ipcRenderer.on('readDirectory', (error, data) => {
    const queue = [];
    const deepClone = { ...directory.root };
    queue.push(deepClone);
    while (queue.length > 0) {
      const currentNode = queue[0];
      if (currentNode.path === data.path) { // matches the path
        currentNode.children = data.children;
        break;
      }
      for (let i = 0; i < currentNode.children.length; i += 1) {
        queue.push(currentNode.children[i]);
      }
      queue.shift();
    }
    dispatch(setDirectory(deepClone));
  });

  // updates schema/ store with incoming data
  ipcRenderer.on('schema', (error, data) => {
    dispatch(setCode(data));
  });

  // ipcRenderer.on('editor', (err, data) => {
  //   dispatch(setCode(data));
  // });

  // updates each node attributes with incoming GraphQL data
  ipcRenderer.on('queryResult', (err, data) => {
    dispatch(updateAttribute(data));
  });

  return (
    <div id="appContainer">
      <Library />
      <Dashboard />
      <Editor />
    </div>
  );
};
