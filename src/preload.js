// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { Titlebar, TitlebarColor } = require("custom-electron-titlebar");

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implementation
  const options = {
    backgroundColor: TitlebarColor.fromHex('#FF0000'),
    overflow: 'hidden'

  };
  new Titlebar(options);
});