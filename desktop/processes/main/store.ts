import type { LanguageId } from "@fairspec/website"
import Store from "electron-store"

interface StoreState {
  lastOpenedFolder?: string
  languageId?: LanguageId
  theme?: "light" | "dark"
}

export const store = new Store<StoreState>()
