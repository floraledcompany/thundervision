// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron');
const dialog = app.dialog;
const path = require('path');
const settings = require('electron-settings');
const { ipcMain } = require('electron');

// const Store = require('./store.js');

// const fs = require('fs'); // Load the File System

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
//check to see if its mac or windows (or linux i guess)
const isMac = process.platform == 'darwin'
// console.log(isMac)                          //DEBUG


// First instantiate the class
// const store = new Store({
//   // We'll call our data file 'user-preferences'
//   configName: 'user-preferences',
//   defaults: {
//     windowBounds: { width: 700, height: 720 }
//   }
// });

function createWindow () {
  // let { width, height } = store.get('windowBounds');
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 700, height: 720,
    icon: 'icons/thundervision_icon_pngs/512x512.png',
    titleBarStyle: 'hiddenInset',
    webPreferences: { nodeIntegration: true }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()

  //build menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert Menu
  Menu.setApplicationMenu(mainMenu);

  // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
  // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
  // mainWindow.on('resize', () => {
  //   // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
  //   // the height, width, and x and y coordinates.
  //   let { width, height } = mainWindow.getBounds();
  //   // Now that we have them, save them using the `set` method.
  //   store.set('windowBounds', { width, height });
  // });
})

// create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: isMac ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Documentation',
        click() {
          console.log('Clicked Documentation')    //DEBUG
        }
      },
      {
        label: 'Toggle Developer Tools',
        role: 'toggleDevTools',
      }
    ]
  }
];

// if(isMac){
//   mainMenuTemplate.unshift({});
// }

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// listen the 'app_quit' event
ipcMain.on('app_quit', (event, info) => {
    if (prefSave_FLAG == true) {app.quit()}
    // else {ipcMain.send('noSave');}
})
var prefSave_FLAG
ipcMain.on('prefSave', (event, info) => {
  prefSave_FLAG = true;
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
