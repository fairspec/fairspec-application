import nodePath from "node:path"
import { is } from "@electron-toolkit/utils"
import { BrowserWindow } from "electron"
// import icon from "#assets/fairspec-logo.svg?asset"
import * as settings from "#settings.ts"

export function createWindow() {
  const indexPath = nodePath.join(import.meta.dirname, "..", "renderer", "index.html")
  const preloadPath = nodePath.join(import.meta.dirname, "..", "preload", "preload.js")

  const mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    // ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
    },
  })

  mainWindow.once("ready-to-show", () => {
    mainWindow.setTitle(settings.APP_NAME)
    mainWindow.setMenu(null)
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.control) {
      if (input.key === "+" || input.key === "=") {
        const currentZoom = mainWindow.webContents.getZoomFactor()
        mainWindow.webContents.setZoomFactor(currentZoom + 0.1)
        event.preventDefault()
      } else if (input.key === "-" || input.key === "_") {
        const currentZoom = mainWindow.webContents.getZoomFactor()
        mainWindow.webContents.setZoomFactor(currentZoom - 0.1)
        event.preventDefault()
      } else if (input.key === "0") {
        mainWindow.webContents.setZoomFactor(1.0)
        event.preventDefault()
      }
    }
  })

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    mainWindow.loadFile(indexPath)
  }

  return mainWindow
}
