import type { Register } from "@tanstack/react-router"
import type { RequestHandler } from "@tanstack/react-start/server"
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server"
import { activateLocal, detectServerLanguage } from "#helpers/locale.ts"

// TODO: rebase on createServerEntry and
// update start version in package.json and remove srvx when fixed
// https://github.com/TanStack/router/issues/5738

const fetch = createStartHandler(defaultStreamHandler)

// Providing `RequestHandler` from `@tanstack/react-start/server` is required so that the output types don't import it from `@tanstack/start-server-core`
export type ServerEntry = { fetch: RequestHandler<Register> }

export function createServerEntry(entry: ServerEntry): ServerEntry {
  return {
    async fetch(request, ...opts) {
      const language = await detectServerLanguage(request)
      await activateLocal(language.languageId)

      return await entry.fetch(request, ...opts)
    },
  }
}

export default createServerEntry({ fetch })
