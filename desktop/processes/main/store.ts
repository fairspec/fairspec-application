import type { LanguageSlug } from "@fairspec/website"
import Store from "electron-store"

interface StoreState {
  lastOpenedFolder?: string
  languageSlug?: LanguageSlug | null
  theme?: "light" | "dark"
}

export const store = new Store<StoreState>()
