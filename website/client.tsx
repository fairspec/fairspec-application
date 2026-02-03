import { StartClient } from "@tanstack/react-start/client"
import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { activateLocale, detectClientLanguage } from "#helpers/locale.ts"
import { activateTheme, detectClientTheme } from "#helpers/theme.ts"

const theme = await detectClientTheme()
activateTheme(theme)

const language = await detectClientLanguage()
await activateLocale(language.id)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
