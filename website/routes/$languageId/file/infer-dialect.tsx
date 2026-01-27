import { InferDialectInput } from "@fairspec/engine"
import { t } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import type * as z from "zod"
import { Dialog } from "#components/dialog/Dialog.tsx"
import { Status, type StatusType } from "#components/dialog/Status.tsx"
import { useAppForm } from "#components/form/hooks.ts"
import { Button } from "#elements/button.tsx"
import { FieldGroup } from "#elements/field.tsx"
import { engine } from "#services/engine.ts"

export const Route = createFileRoute("/$languageId/file/infer-dialect")({
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

  const Form = InferDialectInput.extend({})
  const form = useAppForm({
    defaultValues: {
      file: "",
    } as z.infer<typeof Form>,
    validators: {
      onSubmit: Form,
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
              Infer Dialect
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
            <pre className="bg-muted p-4 rounded-lg overflow-auto">
              <code>{JSON.stringify(dialect, null, 2)}</code>
            </pre>
          )}
        </div>
      </Dialog>
    </form>
  )
}
