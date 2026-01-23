import { createFileRoute, redirect } from "@tanstack/react-router"
import { LanguageIdDefault } from "#constants/language.ts"

// TODO: support detection by headers

export const Route = createFileRoute("/")({
  loader: async () => {
    return redirect({ to: `/${LanguageIdDefault}/` })
  },
})
