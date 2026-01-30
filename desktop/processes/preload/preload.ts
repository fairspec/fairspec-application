import { contextBridge, ipcRenderer } from "electron"
import * as settings from "#settings.ts"

contextBridge.exposeInMainWorld("desktop", {
  engineIpc: settings.ENGINE_IPC,

  openFileDialog: async (options: { filters?: {
    name: string;
    extensions: string[] }[]
  }) => {
    return await ipcRenderer.invoke("dialog:openFile", options)
  },
})

window.addEventListener("message", (event) => {
  if (event.data === settings.ENGINE_IPC) {
    const [serverPort] = event.ports

    if (serverPort) {
      ipcRenderer.postMessage(settings.ENGINE_IPC, null, [serverPort])
    }
  }
})
