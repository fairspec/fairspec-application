export type Language = (typeof Languages)[LanguageId]
export type LanguageId = keyof typeof Languages
export type LanguageSlug = Language["slug"]

export const LanguageIdDefault = "en"

export const Languages = {
  en: { id: "en", slug: undefined, title: "English" },
  de: { id: "de", slug: "de", title: "Deutsch" },
  es: { id: "es", slug: "es", title: "Español" },
  fr: { id: "fr", slug: "fr", title: "Français" },
  it: { id: "it", slug: "it", title: "Italiano" },
  pt: { id: "pt", slug: "pt", title: "Português" },
  ru: { id: "ru", slug: "ru", title: "Русский" },
  uk: { id: "uk", slug: "uk", title: "Українська" },
} as const satisfies Record<string, AbstractLanguage>

interface AbstractLanguage {
  id: string
  slug: string | undefined
  title: string
}
