import { InferDataSchemaInput } from "@fairspec/engine"
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
import { FieldGroup } from "#elements/field.tsx"
import { engine } from "#services/engine.ts"

export const Route = createFileRoute("/$languageId/data/infer-schema")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Infer Data Schema`,
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
        <Trans>Infer Data Schema</Trans>
      </h1>
      <p className="text-lg">
        <Trans>Automatically infer comprehensive data schemas from your datasets</Trans>.
      </p>
    </div>
  )
}

function Form() {
  const { t } = useLingui()
  const [error, setError] = useState<Error | undefined>()
  const [schema, setSchema] = useState<any>()
  const [statusType, setStatusType] = useState<StatusType | undefined>()

  const Form = InferDataSchemaInput.extend({})
  const form = useAppForm({
    defaultValues: {
      data: "",
    } as z.infer<typeof Form>,
    validators: {
      onSubmit: Form,
    },
    onSubmit: async ({ value }) => {
      inferSchema.mutate(value)
    },
  })

  const inferSchema = useMutation(
    engine.dataSchema.infer.mutationOptions({
      onMutate: () => {
        setStatusType("pending")
      },
      onSuccess: schema => {
        setSchema(schema)
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
      setSchema(undefined)
      setError(undefined)
    }
  }

  const handleDownloadSchema = () => {
    if (!schema) return

    const blob = new Blob([JSON.stringify(schema, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "data-schema.json"
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
          name="data"
          children={field => (
            <field.FileOrPathField
              label={t`Data`}
              description={t`Upload a data file or provide a URL to a data file`}
              placeholder="https://example.com/data.json"
              fileType="data"
              required
            />
          )}
        />
        <form.Subscribe
          selector={state => state.values.data}
          children={data => (
            <Button
              size="lg"
              type="submit"
              form="form"
              className="mt-4 w-full text-xl h-12"
              disabled={!data}
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
            pendingTitle={t`Inferring Schema...`}
            successTitle={t`Schema Inferred`}
            errorTitle={error?.message ?? t`Failed to Infer Schema`}
          />
          {schema && (
            <>
              <div className="bg-muted p-4 rounded-lg overflow-auto">
                <JsonEditor data={schema} setData={setSchema} />
              </div>
              <Button
                size="lg"
                onClick={handleDownloadSchema}
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
