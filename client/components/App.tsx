import * as React from 'react';
import Dashboard from './Dashboard';
import Library from "./Library";
import Misc from "./Misc";
// import SchemaBoard from "./SchemaBoard.jsx";
import Editor from './Editor';
import {setDirectory, setCode} from '../actions/componentsAction';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../utils/InterfaceDefinitions';


// @ts-ignore
const ipcRenderer = window.ipcRenderer;

export default () => {
    const dispatch = useDispatch();
    const directory = useSelector((state: GlobalState) => state.directory.data);

    // event listeners from main process (electron)
    ipcRenderer.on('newProject', (error, data) => {
        if (data.hasOwnProperty('path')) dispatch(setDirectory(data));
    });
    ipcRenderer.on('readDirectory', (error, data) => {
        // console.log(data); // { name: 'dir', path: '/Users/sasdfasdf/dir/, children: ['file.js', 'b.js'] }
        const queue = [];
        const deepClone = { ...directory.root };
        queue.push(deepClone);
        while (queue.length > 0) {
            const currentNode = queue[0];
            if (currentNode.path === data.path) { // matches the path
                currentNode.children = data.children;
                break;
            }
            for (let i = 0; i < currentNode.children.length; i++) {
                queue.push(currentNode.children[i]);
            }
            queue.shift();
        }
        dispatch(setDirectory(deepClone));
    });
    ipcRenderer.on('schema', (error, data) => {
        dispatch(setCode(data));
    });

    ipcRenderer.on('editor', (err, data) => {
        dispatch(setCode(data));
    });

    return (<div id={'appContainer'}>
        <Library/>
        <Misc/>
        <Dashboard/>
        <Editor />
    </div>);
}
