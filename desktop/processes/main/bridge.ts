import { dirname, basename, join } from "node:path"
import { writeFile } from "node:fs/promises"
import { electronRpcHandler } from "@fairspec/engine/handlers/electron"
import { dialog, ipcMain } from "electron"
import { store } from "#processes/main/store.ts"
import * as settings from "#settings.ts"

export function createBridge() {
  ipcMain.on(settings.ENGINE_IPC, async event => {
    const [serverPort] = event.ports

    if (serverPort) {
      electronRpcHandler.upgrade(serverPort)
      serverPort.start()
    }
  })

  ipcMain.handle(
    "dialog:openFile",
    async (_, options: { filters?: { name: string; extensions: string[] }[] }) => {
      const lastOpenedFolder = store.get("lastOpenedFolder") as string | undefined

      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: options.filters,
        defaultPath: lastOpenedFolder,
      })

      if (result.canceled || result.filePaths.length === 0) {
        return undefined
      }

      const selectedFile = result.filePaths[0]
      if (selectedFile) {
        const folderPath = dirname(selectedFile)
        store.set("lastOpenedFolder", folderPath)
      }

      return selectedFile
    },
  )

  ipcMain.handle(
    "dialog:saveFile",
    async (_, options: {
      defaultPath?: string
      filters?: { name: string; extensions: string[] }[]
    }) => {
      const lastOpenedFolder = store.get("lastOpenedFolder") as string | undefined

      const result = await dialog.showSaveDialog({
        defaultPath: options.defaultPath
          ? join(lastOpenedFolder || "", basename(options.defaultPath))
          : lastOpenedFolder,
        filters: options.filters,
      })

      if (result.canceled || !result.filePath) {
        return undefined
      }

      const selectedFile = result.filePath
      const folderPath = dirname(selectedFile)
      store.set("lastOpenedFolder", folderPath)

      return selectedFile
    },
  )

  ipcMain.handle(
    "file:write",
    async (_, options: { filePath: string; content: string }) => {
      await writeFile(options.filePath, options.content, "utf-8")
      return options.filePath
    },
  )

  ipcMain.handle("theme:get", async () => {
    const theme = store.get("theme") as "light" | "dark" | undefined
    return theme || "light"
  })

  ipcMain.handle("theme:set", async (_, theme: "light" | "dark") => {
    store.set("theme", theme)
    return theme
  })
}
