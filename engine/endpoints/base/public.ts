import type { Database } from "@keephero/database"
import { os } from "@orpc/server"
import { errorMiddleware } from "#middlewares/error.ts"

export const publicEndpoint = os.use(errorMiddleware)
