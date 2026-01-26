import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code, Text } from "@mantine/core"

export function CellTypeError(props: { error: fairspec.CellTypeError }) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is not</Trans>
      <Code fz="lg" fw="bold">
        {error.columnType}
      </Code>{" "}
      {"type"}
    </Text>
  )
}

export function CellRequiredError(props: {
  error: fairspec.CellRequiredError
}) {
  const { error } = props

  return (
    <Text>
      <Trans>A required cell in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is missing</Trans>
    </Text>
  )
}

export function CellMinimumError(props: { error: fairspec.CellMinimumError }) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is less than</Trans>
      <Code fz="lg" fw="bold">
        {error.minimum}
      </Code>{" "}
      <Trans>minimum</Trans>
    </Text>
  )
}

export function CellMaximumError(props: { error: fairspec.CellMaximumError }) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is more than</Trans>
      <Code fz="lg" fw="bold">
        {error.maximum}
      </Code>{" "}
      <Trans>maximum</Trans>
    </Text>
  )
}

export function CellExclusiveMinimumError(props: {
  error: fairspec.CellExclusiveMinimumError
}) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is less or equal to</Trans>
      <Code fz="lg" fw="bold">
        {error.minimum}
      </Code>{" "}
      <Trans>exclusive minimum</Trans>
    </Text>
  )
}

export function CellExclusiveMaximumError(props: {
  error: fairspec.CellExclusiveMaximumError
}) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is less or equal to</Trans>
      <Code fz="lg" fw="bold">
        {error.maximum}
      </Code>{" "}
      <Trans>exclusive maximum</Trans>
    </Text>
  )
}

export function CellMinLengthError(props: {
  error: fairspec.CellMinLengthError
}) {
  const { error } = props

  return (
    <Text>
      <Trans>Length of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is less than</Trans>
      <Code fz="lg" fw="bold">
        {error.minLength}
      </Code>{" "}
      <Trans>minimum</Trans>
    </Text>
  )
}

export function CellMaxLengthError(props: {
  error: fairspec.CellMaxLengthError
}) {
  const { error } = props

  return (
    <Text>
      <Trans>Length of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is more than</Trans>
      <Code fz="lg" fw="bold">
        {error.maxLength}
      </Code>{" "}
      <Trans>maximum</Trans>
    </Text>
  )
}

export function CellPatternError(props: { error: fairspec.CellPatternError }) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>does not match the</Trans>
      <Code fz="lg" fw="bold">
        {error.pattern}
      </Code>{" "}
      <Trans>pattern</Trans>
    </Text>
  )
}

export function CellUniqueError(props: { error: fairspec.CellUniqueError }) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is not unique</Trans>
    </Text>
  )
}

export function CellEnumError(props: { error: fairspec.CellEnumError }) {
  const { error } = props

  return (
    <Text>
      <Trans>Value of the cell</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.cell}
      </Code>{" "}
      <Trans>in column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.columnName}
      </Code>{" "}
      <Trans>of row</Trans>{" "}
      <Code fz="lg" fw="bold">
        {error.rowNumber}
      </Code>{" "}
      <Trans>is not in the allowed</Trans>
      <Code fz="lg" fw="bold">
        {error.enum.join(", ")}
      </Code>{" "}
      <Trans>values</Trans>
    </Text>
  )
}
