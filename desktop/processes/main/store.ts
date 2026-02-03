import type { LanguageId } from "@fairspec/website"
import Store from "electron-store"

interface StoreState {
  lastOpenedFolder?: string
  theme?: "light" | "dark"
  language?: LanguageId
}

export const store = new Store<StoreState>()
