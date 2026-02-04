import { onError } from "@orpc/server"
import { RPCHandler } from "@orpc/server/message-port"
import { router } from "#router.ts"

export const electronRpcHandler = new RPCHandler(router, {
  interceptors: [
    onError(error => {
      console.error(error)
    }),
  ],
})
