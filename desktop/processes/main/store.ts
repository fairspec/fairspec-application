import Store from "electron-store"

interface StoreState {
  lastOpenedFolder?: string
  theme?: "light" | "dark"
}

export const store = new Store<StoreState>()
