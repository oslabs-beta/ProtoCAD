const electron = require('electron');
const url = require('url');
const path = require('path');
const os = require('os');

const config = require('./config');


const {app, BrowserWindow, ipcMain} = electron;

let mainWindow;

//Listen for app to be ready
app.on('ready', function(){

  // Add React and Redux extension to Electron browser; And call this when browser is ready
  if (process.env.NODE_ENV === 'development') {
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
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    }
  });
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

ipcMain.on('test', (e, data) => {
  console.log(data);
});

// Catch item
ipcMain.on('schema', function(e, data){
  //data will come as json so we parse
  let item = data;
  let schema = '';
  let query = 'type Query {\n';
  //let resolver = 'Query: {\n';

  //translating each node into a graphql type
  const renderType = function(node) {
    if(!node) return;

    let props = '';
    for(let x in node.attributes) {
      props += `${x}: ${node.attributes[x]},\n`
    }
    let children = '';
    for(let i = 0; i < node.children.length; i++) {
      children+= `${node.children[i].name.toLowerCase()}: `;
      //node.children[i].arr ? children+= `[${node.children[i].name}],\n` : children+= `${node.children[i].name},\n`
      children+= `[${node.children[i].name}],\n`
      query += `${node.children[i].name.toLowerCase()}(id: ID!): ${node.children[i].name},\n`
    }

    //resolver += `${node.name.toLowerCase()}(obj, args, context, info) {\n}`

    schema += `type ${node.name} {\n
      ${props}${children}\n
    };\n\n`;
  }


  //run helper function for every root node
  for(let i = 0; i < item.length; i++) {
    renderType(item[i]);
  }

  //end query after its finished filling
  query += `}`;

  //add type query to schema after all the other types
  schema += query;

  mainWindow.webContents.send('schema', schema);
});
