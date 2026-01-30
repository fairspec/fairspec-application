import { stat } from "node:fs/promises"
import { join } from "node:path"
import { protocol } from "electron"

// TODO: rebase on the fetch API
// https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
export function createProxy() {
  protocol.interceptFileProtocol("file", async (request, callback) => {
    const rendererFolder = join(import.meta.dirname, "..", "renderer")

    const url = new URL(request.url)
    let path = join(rendererFolder, url.pathname)

    const isFile = await getIsFile(path)
    if (!isFile) {
      path = join(rendererFolder, "index.html")
    }

    callback({ path })
  })
}

async function getIsFile(path: string) {
  try {
    const stats = await stat(path)
    return stats.isFile()
  } catch {
    return false
  }
}
