const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 1200,
    resizable: true,
    icon: path.join(__dirname, "infisical.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL("some-url");
};

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
