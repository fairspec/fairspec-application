import { t } from "@lingui/core/macro"
import { Trans } from "@lingui/react/macro"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$languageId/dataset/validate")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Validate Dataset`,
      },
      {
        name: "description",
        content: t`Validate dataset metadata against specifications and automatically infer dataset structure from your data files`,
      },
    ],
  }),
})

function Component() {
  return (
    <div className="py-8 flex flex-col gap-8">
      <Intro />
    </div>
  )
}

function Intro() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        <Trans>Validate Dataset</Trans>
      </h1>
      <p className="text-lg">
        <Trans>
          Validate dataset metadata against specifications and automatically infer dataset
          structure from your data files
        </Trans>
        .
      </p>
    </div>
  )
}
