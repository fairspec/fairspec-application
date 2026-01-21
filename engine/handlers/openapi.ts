import { OpenAPIGenerator } from "@orpc/openapi"
import { OpenAPIHandler } from "@orpc/openapi/fetch"
import { CORSPlugin } from "@orpc/server/plugins"
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4"
import metadata from "#package.json" with { type: "json" }
import { router } from "../router.ts"
import * as settings from "../settings.ts"

export async function openapiRequestHandler(request: Request) {
  const prefix = settings.OPENAPI_PREFIX
  const url = new URL(request.url)

  if (url.pathname === prefix) {
    const html = `
        <!doctype html>
        <html>
          <head>
            <title>OpenAPI</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/png" href="https://scalar.com/favicon.png" />
          </head>
          <body>
            <div id="root"></div>
            <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
            <script>
              Scalar.createApiReference('#root', {
                url: '${prefix}/spec.json',
              })
            </script>
          </body>
        </html>
      `

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    })
  }

  if (url.pathname === `${prefix}/spec.json`) {
    const spec = await openapiGenerator.generate(router, {
      info: {
        title: "OpenAPI Spec",
        version: metadata.version,
      },
      servers: [{ url: `${url.origin}${prefix}` }],
    })

    return new Response(JSON.stringify(spec), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { response } = await openapiHandler.handle(request, {
    prefix,
  })

  return response
}

const openapiHandler = new OpenAPIHandler(router, {
  plugins: [
    new CORSPlugin({
      allowMethods: settings.CORS_METHODS,
      exposeHeaders: ["Content-Disposition"],
    }),
  ],
})

const openapiGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
})
