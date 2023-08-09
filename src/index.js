const { app, BrowserWindow, ipcMain, Menu, screen, webContents } = require('electron');
const path = require('path');
const { loginMicrosoft } = require('./scripts/login.js')
const fs = require('node:fs')
let settings = require('./settings.json');

let remoteMain =require('@electron/remote/main')
remoteMain.initialize()
remoteMain.enable(webContents)


let mainWindow
let width
let height

if (require('electron-squirrel-startup')) {
  app.quit();
}

const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");

// setup the titlebar main process
setupTitlebar();



const createWindow = () => {
  console.log(settings)

  // calculs de la taille
  let page;

  let devtools = new BrowserWindow()

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
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  });


  mainWindow.loadURL(path.join(__dirname, 'pages/html/', page + ".html"));

  mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
  mainWindow.webContents.openDevTools({ mode: 'detach' })

  const menu = Menu.buildFromTemplate(exampleMenuTemplate);
	Menu.setApplicationMenu(menu)

  attachTitlebarToWindow(mainWindow);
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
      mainWindow.close()
      createWindow()
    }
  }).catch(err => console.log(err))
})

module.exports = {
  emit: emit
}

// Custom menu
const exampleMenuTemplate = [
	{
		label: 'Simple O&ptions',
		submenu: [
			{
				label: 'Quit',
				click: () => app.quit()
			},
			{
				label: 'Radio1',
				type: 'radio',
				checked: true
			},
		]
	},
	{
		label: 'A&dvanced Options',
		submenu: [
			{
				label: 'Quit',
				click: () => app.quit()
			},
			{
				label: 'Radio1',
				type: 'radio',
				checked: true
			},
			{
				label: 'Radio2',
				type: 'radio'
			},
			{
				label: 'Checkbox1',
				type: 'checkbox',
				checked: true,
				click: (item) => {
					console.log('item is checked? ' + item.checked)
				}
			},
			{ type: 'separator' },
			{
				label: 'Checkbox2',
				type: 'checkbox',
				checked: false,
				click: (item) => {
					console.log('item is checked? ' + item.checked)
				}
			},
			{
				label: 'Radio Test',
				submenu: [
					{
						label: 'S&ample Checkbox',
						type: 'checkbox',
						checked: true
					},
					{
						label: 'Radio1',
						checked: true,
						type: 'radio'
					},
					{
						label: 'Radio2',
						type: 'radio'
					},
					{
						label: 'Radio3',
						type: 'radio'
					},
					{ type: 'separator' },
					{
						label: 'Radio1',
						checked: true,
						type: 'radio'
					},
					{
						label: 'Radio2',
						type: 'radio'
					},
					{
						label: 'Radio3',
						type: 'radio'
					}
				]
			},
			{
				label: 'zoomIn',
				role: 'zoomIn'
			},
			{
				label: 'zoomOut',
				role: 'zoomOut'
			},
			{
				label: 'Radio1',
				type: 'radio'
			},
			{
				label: 'Radio2',
				checked: true,
				type: 'radio'
			}
		]
	},
	{
		label: '&View',
		submenu: [
			{ role: 'reload' },
			{ role: 'forceReload' },
			{ type: 'separator' },
			{ role: 'zoomIn' },
			{ role: 'zoomOut' },
			{ role: 'resetZoom' },
			{ role: 'toggleDevTools' }
		]
	}
]
