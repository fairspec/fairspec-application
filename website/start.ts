import { createMiddleware, createStart } from "@tanstack/react-start"
import { activateLocale, detectServerLanguage } from "#helpers/locale.ts"

// TODO: migrate to server.ts?
// For some reason, it doesn't work in server.ts
// so we implement it as a request middleware

const localeMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const language = await detectServerLanguage(request)
    await activateLocale(language.languageId)

    return await next()
  },
)

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [localeMiddleware],
  }
})
