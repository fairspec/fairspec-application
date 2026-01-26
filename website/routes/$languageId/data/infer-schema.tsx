import { t } from "@lingui/core/macro"
import { createFileRoute } from "@tanstack/react-router"
import { Alert, AlertDescription, AlertTitle } from "#elements/alert.tsx"

export const Route = createFileRoute("/$languageId/data/infer-schema")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Infer Schema`,
      },
      {
        name: "description",
        content: t`Automatically infer comprehensive data schemas from your datasets`,
      },
    ],
  }),
})

function Component() {
  return (
    <div className="py-8">
      <Alert className="border-yellow-400 bg-yellow-50 dark:bg-yellow-800 gap-2">
        <AlertTitle className="text-yellow-500 text-2xl">Under Construction</AlertTitle>
        <AlertDescription className="text-black dark:text-white text-lg">
          This tool is currently under construction and not yet available
        </AlertDescription>
      </Alert>
    </div>
  )
}
