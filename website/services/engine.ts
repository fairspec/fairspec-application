import { createEngineService } from "@fairspec/engine"
import { createTanstackQueryUtils } from "@orpc/tanstack-query"

export const engine = createEngineService(import.meta.env.VITE_ENGINE_URL, {
  engineIpc: globalThis.desktop?.engineIpc,
})

export const engineQuery = createTanstackQueryUtils(engine)
