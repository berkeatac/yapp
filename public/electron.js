const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

// require("update-electron-app")({
//   repo: "kitze/react-electron-example",
//   updateInterval: "1 hour",
// });

const createTray = () => {
  tray = new electron.Tray(path.join(__dirname, "icon.png"));
  tray.on("right-click", toggleWindow);
  tray.on("double-click", toggleWindow);
  tray.on("click", function(event) {
    toggleWindow();

    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({ mode: "detach" });
    }
  });
};

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 900,
//     height: 680,
//     webPreferences: { nodeIntegration: true },
//   });
//   mainWindow.loadURL(
//     isDev
//       ? "http://localhost:3000"
//       : `file://${path.join(__dirname, "../build/index.html")}`
//   );
//   mainWindow.on("closed", () => (mainWindow = null));
// }

const createWindow = () => {
  mainWindow = new electron.BrowserWindow({
    width: 500,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false,
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Hide the window when it loses focus
  mainWindow.on("blur", () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });
};

const iconPath = path.join(__dirname, "icon.png");
app.on("ready", () => {
  createWindow();
  createTray();
});

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x: x, y: y };
};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus();
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
