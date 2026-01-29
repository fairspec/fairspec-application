import { stat } from "node:fs/promises"
import nodePath from "node:path"
import { protocol } from "electron"

// TODO: rebase on the fetch API
// https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
export function createProxy() {
  protocol.interceptFileProtocol("file", async (request, callback) => {
    const rendererPath = nodePath.join(import.meta.dirname, "..", "renderer")
    const url = new URL(request.url)

    let path = nodePath.join(rendererPath, url.pathname)
    const isExists = await checkFileExistence(path)

    if (!isExists) {
      path = nodePath.join(rendererPath, "index.html")
    }

    callback({ path })
  })
}

async function checkFileExistence(path: string) {
  try {
    const stats = await stat(path)
    return stats.isFile()
  } catch {
    return false
  }
}
