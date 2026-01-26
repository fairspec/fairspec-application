import { t } from "@lingui/core/macro"
import { Trans } from "@lingui/react/macro"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$languageId/dataset/infer")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Infer Dataset`,
      },
      {
        name: "description",
        content: t`Automatically infer dataset metadata and structure from your data files`,
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
        <Trans>Infer Dataset</Trans>
      </h1>
      <p className="text-lg">
        <Trans>
          Automatically infer dataset metadata and structure from your data files
        </Trans>
        .
      </p>
    </div>
  )
}
