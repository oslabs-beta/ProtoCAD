const electron = require('electron');
const url = require('url');
// @ts-ignore
const path = require('path');
const os = require('os');
const { fork } = require('child_process');  
// @ts-ignore
const fs = require('fs');
const getDirectory = require('./utils/getDirectory.ts');

const config = require('./config');

const {app, BrowserWindow, ipcMain, Menu, dialog} = electron;

const isMac = process.platform === 'darwin';

let stateSchema = '';
let stateTypes = {};

const setMenu = main => {
  // set menu
  const template = [
    ...(isMac ? [{
      label: 'ProtoCAD',
      submenu: [
        {
          role: 'about'
        },{
          type: 'separator'
        },{
          role: 'quit'
        }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close'} : {role: 'quit'},
        { type: 'separator' },
        {
          label: 'Open Project',
          click() {
            dialog.showOpenDialog(null, {
              properties: ['openDirectory']
            }, filePaths => {
              if (filePaths.length === 0) return;
              getDirectory.readFile(filePaths[0]).then(result => {
                main.webContents.send('newProject', result);
              }).catch(err => {
                main.webContents.send('newProject', err);
              });
            });
          },
          accelerator: 'Cmd+o'
        },
        {
          id: '1',
          label: 'Save Project',
          click() {

          },
          accelerator: 'Cmd+s'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  // @ts-ignore
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

let mainWindow;
const server = fork('./server/server.js')

//Listen for app to be ready
app.on('ready', function(){

  // Add React and Redux extension to Electron browser; And call this when browser is ready
  if (process.env.NODE_ENV === 'development' && process.platform === 'darwin') {
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), `/Library/Application Support/Google/Chrome/Default/Extensions/${config('development').reactExtensionHash}`)
    );
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), `/Library/Application Support/Google/Chrome/Default/Extensions/${config('development').reduxExtensionHash}`)
    )
  }

  //Create new window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 1080,
    webPreferences: {
      nodeIntegration: true,
      // All built-in modules of Node.js are supported in Web Workers, and asar archives can still be read with Node.js
      // APIs. However none of Electron's built-in modules can be used in a multi-threaded environment.
      nodeIntegrationInWorker: true,
      preload: __dirname + '/preload.js',
      experimentalFeatures: true // to enable grid on browserwindow electron
    }
  });
  setMenu(mainWindow);

  mainWindow.maximize();

  //Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  //Quit app when closed
  mainWindow.on('closed', function() {
    app.quit();
  })
});

// catch item
ipcMain.on('schema', function(e, item){
  let schema = '';
  const types  = {};
  let query = 'type Query {\n';
  // translating each node into a graphql type
  const renderType = function(node) {
    if(!node) return;

    types[node.name.toLowerCase()] = node.name;
    types[`all${node.name}`] = node.name;

    query += `  ${node.name.toLowerCase()}: ${node.name},\n`
    query += `  all${node.name}: [${node.name}],\n`

    let props = '';
    for(let x in node.attributes) {
      props += `  ${x}: ${node.attributes[x]},\n`
    }
    let children = '';
    for(let i = 0; i < node.children.length; i++) {
      children+= `  ${node.children[i].component.name.toLowerCase()}: `;
      node.children[i].array ? children+= `[${node.children[i].component.name}],\n`
                             : children+= `${node.children[i].component.name},\n`
    }

    schema += `type ${node.name} {\n${props}${children}}\n\n`;
  };

// run helper function for every root node
  for(let i = 0; i < item.length; i++) {
    renderType(item[i]);
  }
// end query after its finished filling
  query += `}`;
// add type query to schema after all the other types
  schema += query;
  stateSchema = schema;
  stateTypes = types;
  mainWindow.webContents.send('schema', schema);
});

// receives query result and sends to subscribers in client  
server.on('message', (msg) => {
  console.log('message received: ', msg)
  const treeData = [];
  const data = msg.data;
  const rootNode = {};
  rootNode['name'] = 'Application';
  rootNode['children'] = [];
  function recurse(node, name) {
    let output = {};
    output['name'] = name;
    output['children'] = [];
    output['attributes'] = {};
    for(let x in node) {
      //this means that it is a child
      if(stateTypes[x]) {
        if(Array.isArray(node[x])) {
            for(let i = 0; i < node[x].length; i++) {
              output['children'].push(recurse(node[x][i], stateTypes[x]));
            }
          } else {
            output['children'].push(recurse(node[x], stateTypes[x]));
          }
        } else {
          output['attributes'][x] = node[x];
        }
    }
    return output;
  }
  for(let x in data) {
    if(Array.isArray(data[x])) {
      for(let i = 0; i < data[x].length; i++) {
        rootNode['children'].push(recurse(data[x][i], stateTypes[x]));
      }
    } else {
      rootNode['children'].push(recurse(data[x], stateTypes[x]));
    }
  }
  treeData.push(rootNode);
  mainWindow.webContents.send('queryResult', treeData);
});

// listens on channel from renderer process that sends array of objects containing file description
ipcMain.on('openDirectory', (e, { name, path }) => {
  getDirectory.readFile(path).then(result => {
    mainWindow.webContents.send('readDirectory', result);
  }).catch(error => {
    throw error;
  });
});

// saves user written resolvers on to resolver.js
ipcMain.on('resolver', (e, { path, data }) => {
  fs.writeFile(path + '/' + 'resolver.js', data, err => {
    if (err) throw err;
  });
});

// child process makes graphql query
ipcMain.on('query', (e, { path, data }) => {
  server.send([stateSchema, data, path]);
}); 