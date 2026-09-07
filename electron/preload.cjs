const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// safe electron APIs if needed
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  isElectron: true
});
