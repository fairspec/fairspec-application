import { ValidateTableInput } from "@fairspec/engine"
import { t } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import type * as z from "zod"
import { useAppForm } from "#components/form/hooks.ts"
import { Button } from "#elements/button.tsx"
import { FieldGroup } from "#elements/field.tsx"
import { engine } from "#services/engine.ts"

export const Route = createFileRoute("/$languageId/table/validate")({
  component: Component,
  head: () => ({
    meta: [
      {
        title: t`Validate Table`,
      },
      {
        name: "description",
        content: t`Validate table structure for correctness and compliance, and automatically infer table schema definitions from your tabular data`,
      },
    ],
  }),
})

function Component() {
  return (
    <div className="py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">
          <Trans>Validate Table</Trans>
        </h1>
        <p className="text-lg">
          <Trans>
            Validate table structure for correctness and compliance, and
            automatically infer table schema from your tabular data
          </Trans>
          .
        </p>
      </div>
      <ValidateTable />
    </div>
  )
}

export function ValidateTable() {
  const { t } = useLingui()

  const validateTable = useMutation(
    engine.table.validate.mutationOptions({
      onSuccess: report => {
        console.log(report)
      },
    }),
  )

  const Form = ValidateTableInput.extend({})
  const form = useAppForm({
    defaultValues: {
      table: "",
      schema: "",
      dialect: "",
    } as z.infer<typeof Form>,
    validators: {
      onSubmit: Form,
    },
    onSubmit: async ({ value }) => {
      validateTable.mutate(value)
    },
  })

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
              placeholder="https://example.com/table.csv"
              fileType="table"
              required
            />
          )}
        />
        <form.AppField
          name="schema"
          children={field => (
            <field.FileOrPathField
              label={t`Schema`}
              description={t`Upload a file or provide a URL to a table schema`}
              placeholder="https://example.com/table.schema.json"
              fileType="schema"
            />
          )}
        />
        <form.AppField
          name="dialect"
          children={field => (
            <field.FileOrPathField
              label={t`Dialect`}
              description={t`Upload a file or provide a URL to a table dialect`}
              placeholder="https://example.com/table.dialect.json"
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
              Validate Table
            </Button>
          )}
        />
      </FieldGroup>
    </form>
  )
}
