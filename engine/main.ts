import { nativeRequestHandler } from "#handlers/native.ts"
import { openapiRequestHandler } from "#handlers/openapi.ts"

export default {
  async fetch(request, env) {
    const nativeResponse = await nativeRequestHandler(request, env)
    if (nativeResponse) {
      return nativeResponse
    }

    if (import.meta.env.DEV) {
      const openapiResponse = await openapiRequestHandler(request, env)
      if (openapiResponse) {
        return openapiResponse
      }
    }

    return new Response("Not Found", { status: 404 })
  },
} satisfies ExportedHandler<Env>
