// import { getToken } from "@clerk/tanstack-react-start"
import { createEngineService } from "@keephero/engine"
import { createTanstackQueryUtils } from "@orpc/tanstack-query"

export const engine = createTanstackQueryUtils(
  createEngineService({
    headers: () => ({
      authorization: `Bearer ${"TODO"}`,
    }),
  }),
)
