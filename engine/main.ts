import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { openapiRequestHandler } from "#handlers/openapi.ts"
import { orpcRequestHandler } from "#handlers/orpc.ts"
import { logger } from "#services/logger.ts"
import * as settings from "#settings.ts"

const app = new Hono()

app.use(
  "*",
  cors({
    origin: settings.CORS_ORIGINS,
    allowMethods: settings.CORS_METHODS,
  }),
)

app.use(`*`, async (context, next) => {
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

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4000
serve({ fetch: app.fetch, port })

logger.info(`Server running at http://localhost:${port}`)
