import { electronRpcHandler } from "@fairspec/engine/handlers/electron"
import { dialog, ipcMain } from "electron"

export function createBridge() {
  ipcMain.on("engine:start", async event => {
    const [serverPort] = event.ports

    if (serverPort) {
      electronRpcHandler.upgrade(serverPort)
      serverPort.start()
    }
  })

  ipcMain.handle(
    "dialog:openFile",
    async (_, options: { filters?: { name: string; extensions: string[] }[] }) => {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: options.filters,
      })

      if (result.canceled || result.filePaths.length === 0) {
        return null
      }

      return result.filePaths[0]
    },
  )
}
