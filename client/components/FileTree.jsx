import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useDispatch, useSelector } from 'react-redux';
import { setDirectory } from '../actions/componentsAction';

const fs = window.fileSys;
const ipcRenderer = window.ipcRenderer;

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
});

export default props => {
    const classes = useStyles();
    const [contents, setContents] = React.useState([]);
    const dispatch = useDispatch();

    // dispatch and set root directory
    ipcRenderer.on('rootDir', (e, data) => {
        dispatch(setDirectory(data[0]));
    });

    const fileSystem = useSelector(state => state.directory.data);

    React.useEffect(() => {
        if (fileSystem.root.length < 1) return;
        fs.readdir(fileSystem.root, (err, items) => {
            const newContent = [];
            for (let i = 0; i < items.length; i++) {
              const file = fileSystem.root + '/' + items[i];
              if (fs.statSync(file).isDirectory()) {
                if (items[i] !== 'node_modules' && items[i][0] !== '.') newContent.push(recursiveFile(fileSystem.root, items[i], i))
              } else {
                  newContent.push({
                      name: items[i],
                      directory: file,
                      type: 'file',
                      id: i,
                      child: []
                  });
              }
            }
            setContents(newContent);
            console.log(newContent);
        });

    }, [ fileSystem ]);

    const recursiveFile = (root, file, id) => {
        const rootFile = root + '/' + file;
        const output = {
            name: file,
            directory: rootFile,
            type: 'directory',
            id: id,
            child: []
        };
        fs.readdir(rootFile, (err, items) => {
            for (let i = 0; i < items.length; i++) {
                output.child.push(recursiveFile(rootFile, items[i], id))
            }
        });
        return output;
    };

    const dataToJSX = item => {
        return <TreeItem nodeId={item.id.toString()} label={item.name} key={item.id}>
            {
                item.child.length > 0 ? item.child.map(childItem => dataToJSX(childItem)) : undefined
            }
        </TreeItem>
    };
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            id={'fileTree'}
        >
            {
                contents.map(item => dataToJSX(item))
            }
        </TreeView>
    );
}