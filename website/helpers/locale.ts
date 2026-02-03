import { i18n } from "@lingui/core"
import { detect, fromHtmlTag } from "@lingui/detect-locale"
import { type LanguageId, LanguageIdDefault, Languages } from "#constants/language.ts"

export async function activateLocale(languageId: LanguageId) {
  const { messages } = await import(`../locales/${languageId}/messages.po`)

  i18n.load(languageId, messages)
  i18n.activate(languageId)
}

export async function detectClientLanguage() {
  let langTag: string | null | undefined

  if (globalThis.desktop) {
    langTag = await globalThis.desktop.getLanguage()
  } else {
    langTag = detect(fromHtmlTag("lang"))
  }

  const language =
    Object.values(Languages).find(language => language.id === langTag) ??
    Languages[LanguageIdDefault]

  return language
}

export async function detectServerLanguage(request: Request) {
  const { pathname } = new URL(request.url)

  return detectLanguageFromPath(pathname)
}

export function detectLanguageFromPath(path: string) {
  const [languageParam] = path.split("/").slice(1)

  const language =
    Object.values(Languages).find(language => language.id === languageParam) ??
    Languages[LanguageIdDefault]

  return language
}

export async function setLanguage(languageId: LanguageId) {
  if (globalThis.desktop) {
    await globalThis.desktop.setLanguage(languageId)
  }
}
