import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("desktop", {
  openFileDialog: async (options: { filters?: { name: string; extensions: string[] }[] }) => {
    return await ipcRenderer.invoke("dialog:openFile", options)
  },
})
