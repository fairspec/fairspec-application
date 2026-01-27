import { InferDatasetInput } from "@fairspec/engine"
import { t } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import type * as z from "zod"
import { Dialog } from "#components/dialog/Dialog.tsx"
import { Status, type StatusType } from "#components/dialog/Status.tsx"
import { useAppForm } from "#components/form/hooks.ts"
import { Alert, AlertDescription, AlertTitle } from "#elements/alert.tsx"
import { Button } from "#elements/button.tsx"
import { FieldGroup } from "#elements/field.tsx"
import * as icons from "#icons.ts"
import { engine } from "#services/engine.ts"

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
      <Form />
      <Note />
    </div>
  )
}

function Note() {
  return (
    <Alert variant="destructive" className="mt-2">
      <icons.Alert className="size-6" />
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
          Infer Dataset
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
            <pre className="bg-muted p-4 rounded-lg overflow-auto">
              <code>{JSON.stringify(dataset, null, 2)}</code>
            </pre>
          )}
        </div>
      </Dialog>
    </form>
  )
}
