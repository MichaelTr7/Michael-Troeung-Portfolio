// //handle setupevents as quickly as possible
// const setupEvents = require('./installers/setupEvents')
// if (setupEvents.handleSquirrelEvent()) {
//    // squirrel event handled and app will exit in 1000ms, so don't do anything else
//    return;
// }

// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 755,
    height: 480,
    // titleBarStyle: 'Inset',
    frame: false,
    resizable: false,
    transparent:true,
    fullscreen: false,
    fullscreenable:false,
    hasShadow: true,
    vibrancy: 'light',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }

  })

  // and load the index.html of the app.
  mainWindow.loadFile('Main_Panel.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  // Building the menu bar
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.setAboutPanelOptions({
  applicationName: "GPA Grapher",
  applicationVersion: "Version:",
  version: "1.0.0",
  credits: "MichaelTr7"
});

// MacOS menu bar template
const isMac = process.platform === 'darwin'

const template = [


  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },

    ]
  }] : []),


]
