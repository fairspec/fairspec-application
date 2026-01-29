import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("desktop", {
  openFileDialog: async (options: { filters?: { name: string; extensions: string[] }[] }) => {
    return await ipcRenderer.invoke("dialog:openFile", options)
  },
})

window.addEventListener("message", (event) => {
  if (event.data === "engine:start") {
    const [serverPort] = event.ports

    if (serverPort) {
      ipcRenderer.postMessage('engine:start', null, [serverPort])
    }
  }
})
