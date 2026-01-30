import handler, { createServerEntry } from "@tanstack/react-start/server-entry"
import { activateLocale, detectServerLanguage } from "#helpers/locale.ts"

export default createServerEntry({
  async fetch(request) {
    const language = await detectServerLanguage(request)
    await activateLocale(language.id)

    return handler.fetch(request)
  },
})
