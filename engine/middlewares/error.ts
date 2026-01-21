import { os } from "@orpc/server"
import { logger } from "#services/logger.ts"

export const errorMiddleware = os.middleware(async ({ next }) => {
  try {
    return await next()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    logger.withError(error).error(message)
    throw error
  }
})
