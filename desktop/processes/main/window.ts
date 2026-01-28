import nodePath from "node:path"
import { BrowserWindow } from "electron"
import * as settings from "#settings.ts"
// @ts-expect-error
// import icon from "../assets/fairspec-logo.svg?asset"

export function createWindow() {
  const indexPath = nodePath.join(settings.WEBSITE_FOLDER, "index.html")

  const mainWindow = new BrowserWindow({
    show: false,
    // ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: nodePath.join(import.meta.dirname, "..", "preload", "preload.ts"),
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
