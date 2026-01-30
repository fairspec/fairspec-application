import { join } from "node:path"
import { is } from "@electron-toolkit/utils"
import { BrowserWindow } from "electron"
// @ts-expect-error
import iconPath from "#assets/fairspec-logo.svg?asset"
import * as settings from "../../settings.ts"

export function createWindow() {
  const preloadFolder = join(import.meta.dirname, "..", "preload")

  const mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    ...(process.platform === "linux" ? { icon: iconPath } : {}),
    webPreferences: {
      preload: join(preloadFolder, "preload.js"),
      contextIsolation: true,
    },
  })

  if (is.dev) {
    mainWindow.loadURL("http://localhost:5000")
  } else {
    // See proxy config
    mainWindow.loadFile("/")
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.setTitle(settings.APP_NAME)
    mainWindow.setMenu(null)
    mainWindow.maximize()
    mainWindow.show()
  })

  const zoomLevels = [0.5, 0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0]
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.control) {
      if (input.key === "+" || input.key === "=") {
        const currentZoom = mainWindow.webContents.getZoomFactor()
        const nextLevel = zoomLevels.find(level => level > currentZoom)
        if (nextLevel) {
          mainWindow.webContents.setZoomFactor(nextLevel)
        }
        event.preventDefault()
      } else if (input.key === "-" || input.key === "_") {
        const currentZoom = mainWindow.webContents.getZoomFactor()
        const prevLevel = [...zoomLevels].reverse().find(level => level < currentZoom)
        if (prevLevel) {
          mainWindow.webContents.setZoomFactor(prevLevel)
        }
        event.preventDefault()
      } else if (input.key === "0") {
        mainWindow.webContents.setZoomFactor(1.0)
        event.preventDefault()
      }
    }
  })

  return mainWindow
}
