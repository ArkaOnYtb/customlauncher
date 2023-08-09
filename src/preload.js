// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { Titlebar, TitlebarColor } = require("custom-electron-titlebar");
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
  // Title bar implementation
  const options = {
    containerOverflow: 'hidden',
    backgroundColor: TitlebarColor.fromHex('#343135').transparent(0.2),
    overflow: 'hidden',
    icon: path.resolve("src/assets/", "logo.svg"),
    titleHorizontalAlignment: 'left',
  };
  new Titlebar(options)
});