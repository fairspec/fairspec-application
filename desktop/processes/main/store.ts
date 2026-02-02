import Store from "electron-store"

interface StoreState {
  lastOpenedFolder?: string
}

export const store = new Store<StoreState>()
