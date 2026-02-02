import { InferDatasetInput } from "@fairspec/engine"
import { t } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { JsonEditor } from "json-edit-react"
import { useState } from "react"
import type * as z from "zod"
import { Dialog } from "#components/dialog/Dialog.tsx"
import { Status, type StatusType } from "#components/dialog/Status.tsx"
import { useAppForm } from "#components/form/hooks.ts"
import { Button } from "#elements/button.tsx"
import { Alert, AlertDescription, AlertTitle } from "#elements/custom/alert.tsx"
import { FieldGroup } from "#elements/field.tsx"
import * as icons from "#icons.ts"
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
      <Note />
    </div>
  )
}

function Note() {
  return (
    <Alert variant="danger" className="mt-2">
      <AlertTitle className="text-xl">
        <Trans>Desktop Only (coming soon)</Trans>
      </AlertTitle>
      <AlertDescription className="text-base">
        <Trans>This functionality is only available in the desktop application</Trans>
      </AlertDescription>
    </Alert>
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

  const Form = InferDatasetInput.extend({})
  const form = useAppForm({
    defaultValues: {
      file: "",
    } as z.infer<typeof Form>,
    validators: {
      onSubmit: Form,
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
          name="file"
          children={field => (
            <field.FileOrPathField
              label={t`File`}
              description={t`Upload a file or provide a URL to a file`}
              placeholder="https://example.com/file.csv"
              fileType="file"
              required
              disabled
            />
          )}
        />
        <Button
          size="lg"
          type="submit"
          form="form"
          className="mt-4 w-full text-xl h-12"
          disabled
        >
          Infer
        </Button>
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
              <div className="bg-muted p-4 rounded-lg overflow-auto">
                <JsonEditor data={dataset} setData={setDataset} />
              </div>
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
