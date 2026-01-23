import { t } from "@lingui/core/macro"
import { Trans } from "@lingui/react/macro"
import { useForm } from "@tanstack/react-form"
import { createFileRoute } from "@tanstack/react-router"
import { Upload, X } from "lucide-react"
import { useRef } from "react"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "#blocks/button.tsx"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "#blocks/field.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "#blocks/input-group.tsx"

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
    <div className="py-8 flex flex-col gap-4">
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
      <ValidateTable />
    </div>
  )
}
const formSchema = z.object({
  table: z.string().min(1, "Table is required."),
  schema: z.string().optional(),
  dialect: z.string().optional(),
})

export function ValidateTable() {
  const form = useForm({
    defaultValues: {
      table: "",
      schema: "",
      dialect: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })

  return (
    <div className="flex flex-col gap-8">
      <form
        id="validate-table"
        onSubmit={e => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <TableField form={form} />
          <SchemaField form={form} />
          <DialectField form={form} />
        </FieldGroup>
      </form>
      <form.Subscribe
        selector={state => state.values.table}
        children={tableValue => (
          <Button
            type="submit"
            form="validate-table"
            className="w-full text-lg"
            size="lg"
            disabled={!tableValue}
          >
            Validate Table
          </Button>
        )}
      />
    </div>
  )
}

function TableField(props: { form: ReturnType<typeof useForm> }) {
  const { form } = props
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, just set the file name. In production, you'd upload the file and get a URL
      fieldOnChange(file.name)
    }
  }

  return (
    <form.Field
      name="table"
      children={field => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name} className="text-xl">
              Table <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldDescription className="text-base text-inherit">
              Upload a file or provide a URL to a tabular data file
            </FieldDescription>
            <InputGroup>
              <InputGroupInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="https://example.com/data.csv or upload a file"
                autoComplete="off"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={e => handleFileUpload(e, field.handleChange)}
                className="hidden"
                accept=".csv,.tsv,.json,.xml"
              />
              <InputGroupAddon align="inline-start">
                <InputGroupButton
                  onClick={() => fileInputRef.current?.click()}
                  variant="secondary"
                >
                  <Upload />
                  Upload
                </InputGroupButton>
              </InputGroupAddon>
              {field.state.value && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => field.handleChange("")}
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Clear field"
                  >
                    <X />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    />
  )
}

function SchemaField(props: { form: ReturnType<typeof useForm> }) {
  const { form } = props
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, just set the file name. In production, you'd upload the file and get a URL
      fieldOnChange(file.name)
    }
  }

  return (
    <form.Field
      name="schema"
      children={field => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name} className="text-xl">
              Schema
            </FieldLabel>
            <FieldDescription className="text-base text-inherit">
              Upload a file or provide a URL to a table schema definition
            </FieldDescription>
            <InputGroup>
              <InputGroupInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="https://example.com/schema.json or upload a file"
                autoComplete="off"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={e => handleFileUpload(e, field.handleChange)}
                className="hidden"
                accept=".json,.yaml,.yml"
              />
              <InputGroupAddon align="inline-start">
                <InputGroupButton
                  onClick={() => fileInputRef.current?.click()}
                  variant="secondary"
                >
                  <Upload />
                  Upload
                </InputGroupButton>
              </InputGroupAddon>
              {field.state.value && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => field.handleChange("")}
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Clear field"
                  >
                    <X />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    />
  )
}

function DialectField(props: { form: ReturnType<typeof useForm> }) {
  const { form } = props
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, just set the file name. In production, you'd upload the file and get a URL
      fieldOnChange(file.name)
    }
  }

  return (
    <form.Field
      name="dialect"
      children={field => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name} className="text-xl">
              Dialect
            </FieldLabel>
            <FieldDescription className="text-base text-inherit">
              Upload a file or provide a URL to a table dialect specification
            </FieldDescription>
            <InputGroup>
              <InputGroupInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder="https://example.com/dialect.json or upload a file"
                autoComplete="off"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={e => handleFileUpload(e, field.handleChange)}
                className="hidden"
                accept=".json"
              />
              <InputGroupAddon align="inline-start">
                <InputGroupButton
                  onClick={() => fileInputRef.current?.click()}
                  variant="secondary"
                >
                  <Upload />
                  Upload
                </InputGroupButton>
              </InputGroupAddon>
              {field.state.value && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => field.handleChange("")}
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Clear field"
                  >
                    <X />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    />
  )
}
