import { createORPCClient, onError } from "@orpc/client"
import { RPCLink as FetchRpcLink } from "@orpc/client/fetch"
import { RPCLink as MessagePortRpcLink } from "@orpc/client/message-port"
import type { RouterClient } from "@orpc/server"
import type { Router } from "./router.ts"

export function createEngineService(
  url: string,
  options?: {
    isDesktop?: boolean
  },
) {
  const createLink = () => {
    if (options?.isDesktop) {
      const { port1: clientPort, port2: serverPort } = new MessageChannel()
      window.postMessage("start-engine", "*", [serverPort])
      clientPort.start()

      return new MessagePortRpcLink({
        port: clientPort,
        interceptors: [
          onError(error => {
            console.error(error)
          }),
        ],
      })
    }

    return new FetchRpcLink({
      url,
      interceptors: [
        onError(error => {
          console.error(error)
        }),
      ],
    })
  }

  const link = createLink()
  const client: RouterClient<Router> = createORPCClient(link)
  return client
}
