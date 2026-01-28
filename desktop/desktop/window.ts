import nodePath from "node:path"
import { BrowserWindow } from "electron"
// @ts-expect-error
import icon from "../assets/fairspec-logo.svg?asset"
import * as settings from "../settings.ts"

export function createWindow() {
  const indexPath = nodePath.join(settings.RENDERER_DIR, "index.html")

  const mainWindow = new BrowserWindow({
    show: false,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: nodePath.join(import.meta.dirname, "preload", "index.js"),
      contextIsolation: true,
    },
  })

  mainWindow.loadFile(indexPath)
  mainWindow.setTitle(settings.APP_NAME)
  mainWindow.setMenu(null)
  mainWindow.maximize()
  mainWindow.show()

  return mainWindow
}
