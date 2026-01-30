import { StartClient } from "@tanstack/react-start/client"
import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { activateLocale, detectClientLanguage } from "#helpers/locale.ts"

const language = await detectClientLanguage()
await activateLocale(language.id)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
