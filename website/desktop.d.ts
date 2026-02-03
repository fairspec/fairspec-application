import type { LanguageId } from "#constants/language.ts"

export interface DesktopAPI {
  engineIpc: string

  openFileDialog: (options: {
    filters?: { name: string; extensions: string[] }[]
  }) => Promise<string | undefined>

  saveFileDialog: (options: {
    defaultPath?: string
    filters?: { name: string; extensions: string[] }[]
  }) => Promise<string | undefined>

  writeFile: (options: {
    filePath: string
    content: string
  }) => Promise<string>

  getTheme: () => Promise<"light" | "dark">
  setTheme: (theme: "light" | "dark") => Promise<"light" | "dark">

  getLanguage: () => Promise<LanguageId>
  setLanguage: (language: LanguageId) => Promise<LanguageId>
}

declare global {
  var desktop: DesktopAPI | undefined
}
