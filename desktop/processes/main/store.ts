import type { LanguageSlug } from "@fairspec/website"
import Store from "electron-store"

interface StoreState {
  lastOpenedFolder?: string
  languageSlug?: LanguageSlug | null
  zoomFactor?: number
  theme?: "light" | "dark"
}

export const store = new Store<StoreState>()
