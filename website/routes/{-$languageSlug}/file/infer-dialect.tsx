import { InferDialectInput } from "@fairspec/engine"
import { t } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { JsonEditor } from "json-edit-react"
import { useState } from "react"
import type * as z from "zod"
import { DesktopAlert } from "#components/desktop/Alert.tsx"
import { Dialog } from "#components/dialog/Dialog.tsx"
import { Status, type StatusType } from "#components/dialog/Status.tsx"
import { useAppForm } from "#components/form/hooks.ts"
import { Button } from "#elements/button.tsx"
import { FieldGroup } from "#elements/field.tsx"
import { engine } from "#services/engine.ts"

export const Route = createFileRoute("/{-$languageSlug}/file/infer-dialect")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Infer Dialect`,
      },
      {
        name: "description",
        content: t`Automatically infer file formats, encoding specifications, and dialect parameters`,
      },
    ],
  }),
})

function Component() {
  return (
    <div className="py-8 flex flex-col gap-8">
      <Intro />
      <Form />
      <DesktopAlert />
    </div>
  )
}

function Intro() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">
        <Trans>Infer Dialect</Trans>
      </h1>
      <p className="text-lg">
        <Trans>
          Automatically infer file formats, encoding specifications, and dialect
          parameters
        </Trans>
        .
      </p>
    </div>
  )
}

function Form() {
  const { t } = useLingui()
  const [error, setError] = useState<Error | undefined>()
  const [dialect, setDialect] = useState<any>()
  const [statusType, setStatusType] = useState<StatusType | undefined>()

  const FormInput = InferDialectInput.extend({})
  const form = useAppForm({
    defaultValues: {
      file: "",
    } as z.infer<typeof FormInput>,
    validators: {
      onSubmit: FormInput,
    },
    onSubmit: async ({ value }) => {
      inferDialect.mutate(value)
    },
  })

  const inferDialect = useMutation(
    engine.dialect.infer.mutationOptions({
      onMutate: () => {
        setStatusType("pending")
      },
      onSuccess: dialect => {
        setDialect(dialect)
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
      setDialect(undefined)
      setError(undefined)
    }
  }

  const handleDownloadDialect = () => {
    if (!dialect) return

    const blob = new Blob([JSON.stringify(dialect, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "dialect.json"
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
            />
          )}
        />
        <form.Subscribe
          selector={state => state.values.file}
          children={file => (
            <Button
              size="lg"
              type="submit"
              form="form"
              className="mt-4 w-full text-xl h-12"
              disabled={!file}
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
            pendingTitle={t`Inferring Dialect...`}
            successTitle={t`Dialect Inferred`}
            errorTitle={error?.message ?? t`Failed to Infer Dialect`}
          />
          {dialect && (
            <>
              <div className="bg-muted p-4 rounded-lg overflow-auto">
                <JsonEditor data={dialect} setData={setDialect} />
              </div>
              <Button
                size="lg"
                onClick={handleDownloadDialect}
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
