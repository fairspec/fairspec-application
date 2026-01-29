import { createEngineService } from "@fairspec/engine"
import { createTanstackQueryUtils } from "@orpc/tanstack-query"

export const engine = createTanstackQueryUtils(
  createEngineService(import.meta.env.VITE_ENGINE_URL, {
    isDesktop: !!globalThis.desktop,
  }),
)
