import { StartClient } from "@tanstack/react-start/client"
import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { activateLocale, detectClientLanguage } from "#helpers/locale.ts"
import { activateTheme, detectTheme } from "#helpers/theme.ts"

const language = await detectClientLanguage()
await activateLocale(language.id)

const theme = await detectTheme()
activateTheme(theme)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
