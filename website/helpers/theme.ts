const STORAGE_KEY = "tanstack-theme"

export type Theme = "light" | "dark"

export async function detectTheme() {
  let theme: Theme | null = null

  if (globalThis.desktop) {
    theme = await globalThis.desktop.getTheme()
  } else {
    theme = localStorage.getItem(STORAGE_KEY) as Theme | null
  }

  return theme || "light"
}

export function activateTheme(theme: Theme) {
  if (theme === "dark") {
    globalThis.document.documentElement.classList.add("dark")
  } else {
    globalThis.document.documentElement.classList.remove("dark")
  }
}

export function getCurrentTheme() {
  return globalThis.document?.documentElement.classList.contains("dark")
    ? "dark"
    : "light"
}

export async function setTheme(theme: Theme) {
  activateTheme(theme)

  if (globalThis.desktop) {
    await globalThis.desktop.setTheme(theme)
  } else {
    localStorage.setItem(STORAGE_KEY, theme)
  }
}
