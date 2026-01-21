import { clerkMiddleware } from "@clerk/tanstack-react-start/server"
import { createStart } from "@tanstack/react-start"
import { activateLocal } from "#helpers/locale.ts"

// TODO: Remove when proper server/client entrypoints work
await activateLocal("en")

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [clerkMiddleware()],
  }
})
