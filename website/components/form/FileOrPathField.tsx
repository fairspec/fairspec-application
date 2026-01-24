import { useRef } from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "#elements/field.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "#elements/input-group.tsx"
import * as icons from "#icons.ts"
import { useFieldContext } from "./context.ts"

export function FileOrPathField(props: {
  label: string
  description?: string
  placeholder?: string
  fileType?: "table" | "schema" | "dialect"
  required?: boolean
}) {
  const field = useFieldContext<File | string>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const value = field.state.value
    ? typeof field.state.value === "string"
      ? field.state.value
      : field.state.value.name
    : undefined

  const fileInputAccept = ["json"]
  if (props.fileType === "table") {
    fileInputAccept.push(
      "csv",
      "tsv",
      "json",
      "jsonl",
      "ndjson",
      "xlsx",
      "ods",
      "parquet",
      "arrow",
      "feather",
      "sqlite",
    )
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="text-xl">
        {props.label}{" "}
        {props.required && <span className="text-destructive">*</span>}
      </FieldLabel>
      {props.description && (
        <FieldDescription className="text-base text-inherit">
          {props.description}
        </FieldDescription>
      )}
      <InputGroup>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          placeholder={props.placeholder}
          autoComplete="off"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) field.handleChange(file)
          }}
          className="hidden"
          accept={fileInputAccept.join(",")}
        />
        <InputGroupAddon align="inline-start">
          <InputGroupButton
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
          >
            <icons.Upload />
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
              <icons.Close />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
