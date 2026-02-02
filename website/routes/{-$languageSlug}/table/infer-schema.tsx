import { InferTableSchemaInput } from "@fairspec/engine"
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

export const Route = createFileRoute("/{-$languageSlug}/table/infer-schema")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Infer Table Schema`,
      },
      {
        name: "description",
        content: t`Automatically infer comprehensive table schema definitions from your tabular data`,
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
        <Trans>Infer Table Schema</Trans>
      </h1>
      <p className="text-lg">
        <Trans>
          Automatically infer comprehensive table schema definitions from your tabular
          data
        </Trans>
        .
      </p>
    </div>
  )
}

function Form() {
  const { t } = useLingui()
  const [error, setError] = useState<Error | undefined>()
  const [schema, setSchema] = useState<any>()
  const [statusType, setStatusType] = useState<StatusType | undefined>()

  const FormInput = InferTableSchemaInput.extend({})
  const form = useAppForm({
    defaultValues: {
      table: "",
      dialect: "",
    } as z.infer<typeof FormInput>,
    validators: {
      onSubmit: FormInput,
    },
    onSubmit: async ({ value }) => {
      inferSchema.mutate(value)
    },
  })

  const inferSchema = useMutation(
    engine.tableSchema.infer.mutationOptions({
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
    link.download = "table-schema.json"
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
              description={t`Upload a table or provide a URL to a table`}
              placeholder="https://example.com/table.csv"
              fileType="table"
              required
            />
          )}
        />
        <form.AppField
          name="dialect"
          children={field => (
            <field.FileOrPathField
              label={t`Dialect`}
              description={t`Upload a dialect or provide a URL to a dialect`}
              placeholder="https://example.com/dialect.json"
              fileType="dialect"
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
            pendingTitle={t`Inferring Schema...`}
            successTitle={t`Schema Inferred`}
            errorTitle={error?.message ?? t`Failed to Infer Schema`}
          />
          {schema && (
            <>
              <Json value={schema} />
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
