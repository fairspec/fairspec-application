import { os } from "@orpc/server"
import { errorMiddleware } from "#middlewares/error.ts"

export const publicEndpoint = os
  .$context<{
    isDesktop?: boolean
  }>()
  .use(errorMiddleware)
