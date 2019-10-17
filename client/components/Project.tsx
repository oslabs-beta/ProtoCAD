import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

// @ts-ignore
const ipcRenderer = window.ipcRenderer;

const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});



export default function FileSystemNavigator() {
    const [files, setFiles] = React.useState({children: []});
    const classes = useStyles({});

    ipcRenderer.on('newProject', (error, data) => {
        console.log('new project!');
        if (data.hasOwnProperty('path')) setFiles(data);
    });

    ipcRenderer.on('readDirectory', (error, data) => {
        console.log('why console three times?');
        // console.log(data); // { name: 'dir', path: '/Users/sasdfasdf/dir/, children: ['file.js', 'b.js'] }
        const queue = [];
        const deepClone = {...files};
        queue.push(deepClone);
        while (queue.length > 0) {
            const currentNode = queue[0];
            if (currentNode.path === data.path) { // matches the path
                console.log('matched!');
                currentNode.children = data.children;
                break;
            }
            for (let i = 0; i < currentNode.children.length; i++) {
                queue.push(currentNode.children[i]);
            }
            queue.shift();
        }
        console.log(deepClone);
        setFiles(deepClone);
    });

    React.useEffect(() => {
        console.log('changed!');
        console.log(files);
    }, [files]);

    const onClick = ({name, path}) => {
        ipcRenderer.send('openDirectory', {name, path});
    };

    const handleReference = element => {
        // console.log(element);
    };

    const onDoubleClickFile = item => {
        console.log('double clicked file!');
        ipcRenderer.send('readFile', item.path);
    };

    const renderTreeItems = items => {
        console.log('render');
        return items.map(item => {
            // @ts-ignore
            return item.isDirectory ? <TreeItem onClick={e => onClick(item)} key={item.path} nodeId={item.path} label={item.name}>{renderTreeItems(item.children)}</TreeItem> : <TreeItem ref={handleReference} onDoubleClick={e => onDoubleClickFile(item)} key={item.path} nodeId={item.path} label={item.name} />
        });
    };
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {
                renderTreeItems(files.children)
            }
        </TreeView>
    );
}