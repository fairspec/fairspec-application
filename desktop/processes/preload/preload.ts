const { contextBridge } = require("electron")
// import { electronAPI } from '@electron-toolkit/preload'

contextBridge.exposeInMainWorld("desktop", {})
