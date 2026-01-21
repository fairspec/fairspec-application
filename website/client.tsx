import { StartClient } from "@tanstack/react-start/client"
import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { activateLocal, detectClientLanguage } from "#helpers/locale.ts"

const language = await detectClientLanguage()
await activateLocal(language.languageId)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
