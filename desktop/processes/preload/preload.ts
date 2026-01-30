import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("desktop", {
  engineIpc: import.meta.env.VITE_ENGINE_IPC,
  openFileDialog: async (options: { filters?: { name: string; extensions: string[] }[] }) => {
    return await ipcRenderer.invoke("dialog:openFile", options)
  },
})

window.addEventListener("message", (event) => {
  if (event.data === import.meta.env.VITE_ENGINE_IPC) {
    const [serverPort] = event.ports

    if (serverPort) {
      ipcRenderer.postMessage(import.meta.env.VITE_ENGINE_IPC, null, [serverPort])
    }
  }
})
