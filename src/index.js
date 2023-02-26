const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
let settings = require('./settings.json');

let mainWindow
let width
let height

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

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
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'pages/', page + ".html"));
  mainWindow.webContents.openDevTools();
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
