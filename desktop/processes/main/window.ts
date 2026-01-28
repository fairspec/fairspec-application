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

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    mainWindow.loadFile(indexPath)
  }

  mainWindow.setTitle(settings.APP_NAME)
  mainWindow.setMenu(null)
  mainWindow.maximize()
  mainWindow.show()

  return mainWindow
}
