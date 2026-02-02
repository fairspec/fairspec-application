import { dirname } from "node:path"
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
        return null
      }

      const selectedFile = result.filePaths[0]
      if (selectedFile) {
        const folderPath = dirname(selectedFile)
        store.set("lastOpenedFolder", folderPath)
      }

      return selectedFile
    },
  )
}
