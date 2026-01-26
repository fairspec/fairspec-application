import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code } from "#components/common/Code.tsx"

export function CellTypeError(props: { error: fairspec.CellTypeError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is not</Trans> <Code>{error.columnType}</Code> {"type"}
    </p>
  )
}

export function CellRequiredError(props: { error: fairspec.CellRequiredError }) {
  const { error } = props

  return (
    <p>
      <Trans>A required cell in column</Trans> <Code>{error.columnName}</Code>{" "}
      <Trans>of row</Trans> <Code>{error.rowNumber}</Code> <Trans>is missing</Trans>
    </p>
  )
}

export function CellMinimumError(props: { error: fairspec.CellMinimumError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is less than</Trans>
      <Code>{error.minimum}</Code> <Trans>minimum</Trans>
    </p>
  )
}

export function CellMaximumError(props: { error: fairspec.CellMaximumError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is more than</Trans>
      <Code>{error.maximum}</Code> <Trans>maximum</Trans>
    </p>
  )
}

export function CellExclusiveMinimumError(props: {
  error: fairspec.CellExclusiveMinimumError
}) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is less or equal to</Trans>
      <Code>{error.minimum}</Code> <Trans>exclusive minimum</Trans>
    </p>
  )
}

export function CellExclusiveMaximumError(props: {
  error: fairspec.CellExclusiveMaximumError
}) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is less or equal to</Trans>
      <Code>{error.maximum}</Code> <Trans>exclusive maximum</Trans>
    </p>
  )
}

export function CellMinLengthError(props: { error: fairspec.CellMinLengthError }) {
  const { error } = props

  return (
    <p>
      <Trans>Length of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is less than</Trans>
      <Code>{error.minLength}</Code> <Trans>minimum</Trans>
    </p>
  )
}

export function CellMaxLengthError(props: { error: fairspec.CellMaxLengthError }) {
  const { error } = props

  return (
    <p>
      <Trans>Length of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is more than</Trans>
      <Code>{error.maxLength}</Code> <Trans>maximum</Trans>
    </p>
  )
}

export function CellPatternError(props: { error: fairspec.CellPatternError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>does not match the</Trans>
      <Code>{error.pattern}</Code> <Trans>pattern</Trans>
    </p>
  )
}

export function CellUniqueError(props: { error: fairspec.CellUniqueError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is not unique</Trans>
    </p>
  )
}

export function CellEnumError(props: { error: fairspec.CellEnumError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is not in the allowed</Trans>
      <Code>{error.enum.join(", ")}</Code> <Trans>values</Trans>
    </p>
  )
}
