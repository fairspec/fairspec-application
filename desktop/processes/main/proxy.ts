import { stat } from "node:fs/promises"
import { join } from "node:path"
import { protocol } from "electron"

// TODO: rebase on the fetch API
// https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
export function createProxy() {
  protocol.interceptFileProtocol("file", async (request, callback) => {
    const rendererFolder = join(import.meta.dirname, "..", "renderer")

    const url = new URL(request.url)
    let path = join(rendererFolder, "client", url.pathname)

    const isExists = await checkFileExistence(path)
    if (!isExists) {
      path = join(rendererFolder, "client", "index.html")
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
