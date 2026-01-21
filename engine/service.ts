import { createORPCClient, onError } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import type { RouterClient } from "@orpc/server"
import type { Router } from "./router.ts"

export function createEngineService(
  url: string,
  options?: {
    headers: () => Record<string, string>
  },
) {
  const link = new RPCLink({
    url,
    headers: options?.headers,
    interceptors: [
      onError(error => {
        console.error(error)
      }),
    ],
  })

  // Create a client for your router
  const client: RouterClient<Router> = createORPCClient(link)
  return client
}
