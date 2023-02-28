const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { loginMicrosoft } = require('./scripts/login.js')
const fs = require('node:fs')
let settings = require('./settings.json');

let mainWindow
let width
let height

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  console.log(settings)

  // calculs de la taille
  let page;
  if(settings.account == null) {
    page = 'login'
    // la fenetre fait 1 tier de la page
    width = Math.round(screen.getPrimaryDisplay().size.width * 1/3)
  } else {
    page = 'main'
    // là elle fait 3 quarts
    width = Math.round(screen.getPrimaryDisplay().size.width * 3/4)
  }
  
  height = Math.round(screen.getPrimaryDisplay().size.height * 3/4)

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    title: settings.title,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: 'hidden',
    resizable: false 
  });
  mainWindow.loadFile(path.join(__dirname, 'pages/html/', page + ".html"));
  //mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function emit(name, args) {
  mainWindow.webContents.send(name, args)
}

function writeJson() {
  fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2), err => console.log(err))
}

ipcMain.handle('close', () => {
  if(mainWindow.closable) {
    mainWindow.close()
  } else {
    mainWindow.destroy()
  }
})

ipcMain.handle('reduce', () => {
  mainWindow.minimize()
})

ipcMain.handle('minimize', () => {
  mainWindow.unmaximize()
})

ipcMain.handle('maximize', () => {
  mainWindow.maximize()
})

ipcMain.on('dragged', (event) => {
  event.reply('dragged', mainWindow.isFullscreen())
})

ipcMain.on('loginMicrosoft', async (event, args) => {
   let login = await loginMicrosoft().then(res => {
    if(res != 1) {
      settings.account = res;
      writeJson()
    }
  }).catch(err => console.log(err))
})

module.exports = {
  emit: emit
}
