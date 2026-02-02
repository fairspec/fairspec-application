import { InferDatasetInput } from "@fairspec/engine"
import { t } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import type * as z from "zod"
import { Json } from "#components/common/Json.tsx"
import { DesktopAlert } from "#components/desktop/Alert.tsx"
import { Dialog } from "#components/dialog/Dialog.tsx"
import { Status, type StatusType } from "#components/dialog/Status.tsx"
import { useAppForm } from "#components/form/hooks.ts"
import { Button } from "#elements/button.tsx"
import { FieldGroup } from "#elements/field.tsx"
import { engine } from "#services/engine.ts"

export const Route = createFileRoute("/{-$languageSlug}/dataset/infer")({
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
      <Form />
      <DesktopAlert desktopRequired={true} />
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

function Form() {
  const { t } = useLingui()
  const [error, setError] = useState<Error | undefined>()
  const [dataset, setDataset] = useState<any>()
  const [statusType, setStatusType] = useState<StatusType | undefined>()

  const FormInput = InferDatasetInput.extend({})
  const form = useAppForm({
    defaultValues: {
      table: "",
    } as z.infer<typeof FormInput>,
    validators: {
      onSubmit: FormInput,
    },
    onSubmit: async ({ value }) => {
      inferDataset.mutate(value)
    },
  })

  const inferDataset = useMutation(
    engine.dataset.infer.mutationOptions({
      onMutate: () => {
        setStatusType("pending")
      },
      onSuccess: dataset => {
        setDataset(dataset)
        setStatusType("success")
      },
      onError: error => {
        setError(error)
        setStatusType("error")
      },
    }),
  )

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setStatusType(undefined)
      setDataset(undefined)
      setError(undefined)
    }
  }

  const handleDownloadDataset = () => {
    if (!dataset) return

    const blob = new Blob([JSON.stringify(dataset, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "dataset.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <form
      id="form"
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.AppField
          name="table"
          children={field => (
            <field.FileOrPathField
              label={t`Table`}
              description={t`Upload a file or provide a URL to a tabular data file`}
              placeholder="https://example.com/file.csv"
              fileType="table"
              disabled={!globalThis.desktop}
              required
            />
          )}
        />
        <form.Subscribe
          selector={state => state.values.table}
          children={table => (
            <Button
              size="lg"
              type="submit"
              form="form"
              className="mt-4 w-full text-xl h-12"
              disabled={!table}
            >
              Infer
            </Button>
          )}
        />
      </FieldGroup>
      <Dialog open={!!statusType} onOpenChange={handleDialogOpenChange}>
        <div className="flex flex-col gap-8">
          <Status
            statusType={statusType}
            pendingTitle={t`Inferring Dataset...`}
            successTitle={t`Dataset Inferred`}
            errorTitle={error?.message ?? t`Failed to Infer Dataset`}
          />
          {dataset && (
            <>
              <Json value={dataset} />
              <Button
                size="lg"
                onClick={handleDownloadDataset}
                className="w-full text-xl h-12"
              >
                <Trans>Save</Trans>
              </Button>
            </>
          )}
        </div>
      </Dialog>
    </form>
  )
}
