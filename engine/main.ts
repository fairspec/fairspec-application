import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { openapiRequestHandler } from "#handlers/openapi.ts"
import { orpcRequestHandler } from "#handlers/orpc.ts"
import * as settings from "#settings.ts"

const app = new Hono()
const port = Number.parseInt(process.env.PORT ?? "", 10) ?? 4000

app.use(`${settings.OPENAPI_PREFIX}/*`, async (context, next) => {
  const orpcResponse = await orpcRequestHandler(context.req.raw)
  if (orpcResponse) {
    return context.newResponse(orpcResponse.body, orpcResponse)
  }

  if (process.env.NODE_ENV === "development") {
    const openapiResponse = await openapiRequestHandler(context.req.raw)
    if (openapiResponse) {
      return context.newResponse(openapiResponse.body, openapiResponse)
    }
  }

  return await next()
})

serve({
  fetch: app.fetch,
  port,
})

console.log(`Server running at http://localhost:${port}`)
