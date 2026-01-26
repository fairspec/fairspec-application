import { t } from "@lingui/core/macro"
import { Trans } from "@lingui/react/macro"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/$languageId/file/validate")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Validate File`,
      },
      {
        name: "description",
        content: t`Describe file contents and structure in detail, and automatically infer file formats and encoding specifications`,
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
        <Trans>Validate File</Trans>
      </h1>
      <p className="text-lg">
        <Trans>
          Describe file contents and structure in detail, and automatically infer file formats
          and encoding specifications
        </Trans>
        .
      </p>
    </div>
  )
}
