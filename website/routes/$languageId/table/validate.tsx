import { t } from "@lingui/core/macro"
import { Trans } from "@lingui/react/macro"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$languageId/table/validate")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Validate Table`,
      },
      {
        name: "description",
        content: t`Validate table structure for correctness and compliance, and automatically infer table schema definitions from your tabular data`,
      },
    ],
  }),
})

function Component() {
  return (
    <div className="py-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        <Trans>Validate Table</Trans>
      </h1>
      <p className="text-lg">
        <Trans>
          Validate table structure for correctness and compliance, and
          automatically infer table schema from your tabular data
        </Trans>
        .
      </p>
    </div>
  )
}
