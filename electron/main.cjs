const electron = require('electron');

// Check if running in a cloud/server environment (Render/Railway/Heroku) via plain Node.js
if (typeof electron === 'string' || !electron.app) {
  console.log('[INFO] Detected Node.js cloud environment (Render.com).');
  console.log('[INFO] Starting production web server to serve web application...');
  require('../server.cjs');
  return;
}

const { app, BrowserWindow, session, ipcMain, shell } = electron;
const path = require('path');

let mainWindow = null;

// GPU hardware acceleration for smooth 60fps rendering
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('ignore-gpu-blocklist');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    title: 'Badminton Pro - Hệ Thống Luyện Phản Xạ 9 Ô',
    icon: path.join(__dirname, '../public/icon.ico'),
    backgroundColor: '#080d14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      backgroundThrottling: false
    },
    autoHideMenuBar: true
  });

  // Open external links directly in user default browser (Chrome/Edge)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Automatically grant camera and microphone permissions in Electron
  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    if (permission === 'media') {
      return true;
    }
    return false;
  });

  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media') {
      callback(true); // Approve camera
    } else {
      callback(false);
    }
  });

  const isDev = process.env.NODE_ENV !== 'production' && !app.isPackaged;

  mainWindow.webContents.on('did-fail-load', () => {
    console.log('[ELECTRON] Failed to load dev URL, falling back to local build dist/index.html...');
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  });

  if (isDev) {
    mainWindow.loadURL('http://127.0.0.1:5188').catch(() => {
      mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
