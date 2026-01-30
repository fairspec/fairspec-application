import { join } from "node:path"
import { protocol } from "electron"

// TODO: rebase on the fetch API
// https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
export function createProxy() {
  protocol.interceptFileProtocol("file", async (request, callback) => {
    const rendererFolder = join(import.meta.dirname, "..", "renderer")

    const url = new URL(request.url)
    const assetName = url.pathname.split("/assets/")[1]

    console.log(request.url)
    console.log(url.pathname)

    const path = assetName
      ? join(rendererFolder, "assets", assetName)
      : join(rendererFolder, "index.html")

    callback({ path })
  })
}
