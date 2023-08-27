// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { Titlebar, TitlebarColor } = require("custom-electron-titlebar");
const { contextBridge, ipcRenderer } = require('electron')



const path = require('path');
const storage = require('./settings.json')

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implementation
  const options = {
    containerOverflow: 'hidden',
    backgroundColor: TitlebarColor.fromHex('#343135').transparent(0.2),
    overflow: 'hidden',
    icon: path.resolve("src/assets/img/", "logo.png"),
    maximizable: false,
    titleHorizontalAlignment: 'left',
  };
  
  //if(storage.account != null) {
    new Titlebar(options)
  //}

});


contextBridge.exposeInMainWorld('instanceAPI', {

  sendUserUuid: () => ipcRenderer.invoke('userUuid'),
  sendUserName: () => ipcRenderer.invoke('userName'),

  sendCloseWin: () => ipcRenderer.invoke('close'),
  sendReduceWin: () => ipcRenderer.invoke('reduce'),

  sendLoginUser: () => ipcRenderer.invoke('loginMicrosoft'),
  sendPlayGame: () => ipcRenderer.invoke('launchGame'),

  onLoadingStatus: (callback) => ipcRenderer.on('loadPercentage', (callback))


  // we can also expose variables, not just functions
})



