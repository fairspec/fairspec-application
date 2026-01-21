import { onError } from "@orpc/server"
import { RPCHandler } from "@orpc/server/fetch"
import { CORSPlugin } from "@orpc/server/plugins"
import { router } from "#router.ts"
import { logger } from "#services/logger.ts"
import * as settings from "#settings.ts"

export async function orpcRequestHandler(request: Request) {
  const { response } = await orpcHandler.handle(request, {
    prefix: settings.NATIVE_PREFIX,
  })

  return response
}

export const orpcHandler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin({
      allowMethods: settings.CORS_METHODS,
      exposeHeaders: ["Content-Disposition"],
    }),
  ],
  interceptors: [
    onError(error => {
      logger.error(String(error))
    }),
  ],
})
