import type * as fairspec from "@fairspec/metadata"
import { Trans, useLingui } from "@lingui/react/macro"
import { capitalize } from "es-toolkit"
import { Code } from "#components/common/Code.tsx"

export function Error(props: { error: fairspec.FairspecError }) {
  const { error } = props

  switch (error.type) {
    case "cell/enum":
      return <CellEnumError error={error} />
    case "cell/exclusiveMaximum":
      return <CellExclusiveMaximumError error={error} />
    case "cell/exclusiveMinimum":
      return <CellExclusiveMinimumError error={error} />
    case "cell/maxLength":
      return <CellMaxLengthError error={error} />
    case "cell/maximum":
      return <CellMaximumError error={error} />
    case "cell/minLength":
      return <CellMinLengthError error={error} />
    case "cell/minimum":
      return <CellMinimumError error={error} />
    case "cell/pattern":
      return <CellPatternError error={error} />
    case "cell/required":
      return <CellRequiredError error={error} />
    case "cell/type":
      return <CellTypeError error={error} />
    case "cell/unique":
      return <CellUniqueError error={error} />
    case "column/missing":
      return <ColumnMissingError error={error} />
    case "column/type":
      return <ColumnTypeError error={error} />
    case "data":
      return <DataError error={error} />
    case "file/integrity":
      return <IntegrityError error={error} />
    case "file/textual":
      return <TextualError error={error} />
    case "foreignKey":
      return <ForeignKeyError error={error} />
    case "metadata":
      return <MetadataError error={error} />
    case "row/uniqueKey":
      return <RowUniqueError error={error} />
    default:
      return null
  }
}

// Cell

function CellEnumError(props: { error: fairspec.CellEnumError }) {
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

function CellExclusiveMaximumError(props: { error: fairspec.CellExclusiveMaximumError }) {
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

function CellExclusiveMinimumError(props: { error: fairspec.CellExclusiveMinimumError }) {
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

function CellMaxLengthError(props: { error: fairspec.CellMaxLengthError }) {
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

function CellMaximumError(props: { error: fairspec.CellMaximumError }) {
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

function CellMinLengthError(props: { error: fairspec.CellMinLengthError }) {
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

function CellMinimumError(props: { error: fairspec.CellMinimumError }) {
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

function CellPatternError(props: { error: fairspec.CellPatternError }) {
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

function CellRequiredError(props: { error: fairspec.CellRequiredError }) {
  const { error } = props

  return (
    <p>
      <Trans>A required cell in column</Trans> <Code>{error.columnName}</Code>{" "}
      <Trans>of row</Trans> <Code>{error.rowNumber}</Code> <Trans>is missing</Trans>
    </p>
  )
}

function CellTypeError(props: { error: fairspec.CellTypeError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is not</Trans> <Code>{error.columnType}</Code> {"type"}
    </p>
  )
}

function CellUniqueError(props: { error: fairspec.CellUniqueError }) {
  const { error } = props

  return (
    <p>
      <Trans>Value of the cell</Trans> <Code>{error.cell}</Code> <Trans>in column</Trans>{" "}
      <Code>{error.columnName}</Code> <Trans>of row</Trans> <Code>{error.rowNumber}</Code>{" "}
      <Trans>is not unique</Trans>
    </p>
  )
}

// Column

function ColumnMissingError(props: { error: fairspec.ColumnMissingError }) {
  return (
    <p>
      <Trans>The columns</Trans> <Code>{props.error.columnName}</Code>{" "}
      <Trans>are missing</Trans>
    </p>
  )
}

function ColumnTypeError(props: { error: fairspec.ColumnTypeError }) {
  return (
    <p>
      <Trans>Column</Trans> <Code>{props.error.columnName}</Code>{" "}
      <Trans>is expected to be</Trans> <Code>{props.error.expectedColumnType}</Code>{" "}
      <Trans>but it is actually</Trans> <Code>{props.error.actualColumnType}</Code>
    </p>
  )
}

// Data

function DataError(props: { error: fairspec.DataError }) {
  const { t } = useLingui()

  return <p>{t`${props.error.message}`}</p>
}

// File

function IntegrityError(props: { error: fairspec.IntegrityError }) {
  return (
    <p>
      <Trans>File hash</Trans> <Code>{props.error.hashType}</Code>{" "}
      <Trans>is expected to be</Trans> <Code>{props.error.expectedHash}</Code>{" "}
      <Trans>but it is actually</Trans> <Code>{props.error.actualHash}</Code>
    </p>
  )
}

function TextualError(props: { error: fairspec.TextualError }) {
  return (
    <p>
      <Trans>File</Trans> <Trans>is expected to be</Trans>{" "}
      <Trans>textual with utf-8 encoding</Trans>{" "}
      {props.error.actualEncoding && (
        <span>
          <Trans>but it is actually has</Trans> <Code>{props.error.actualEncoding}</Code>
          <Trans>encoding</Trans>
        </span>
      )}
    </p>
  )
}

// Foreign Key

function ForeignKeyError(props: { error: fairspec.ForeignKeyError }) {
  return (
    <p>
      <Trans>Foreign key violation in column(s)</Trans>{" "}
      <Code>{props.error.foreignKey.columns.join(", ")}</Code>
      {": "}
      <Code>{props.error.cells.join(", ")}</Code>
    </p>
  )
}

// Metadata

function MetadataError(props: { error: fairspec.MetadataError }) {
  const { t } = useLingui()

  return (
    <p>
      {capitalize(t`${props.error.message}`)} {t`at`}{" "}
      <Code>{props.error.jsonPointer}</Code>
    </p>
  )
}

// Row

function RowUniqueError(props: { error: fairspec.RowUniqueKeyError }) {
  return (
    <p>
      <Trans>The cell values of the fields</Trans>{" "}
      <Code>{props.error.columnNames.join(", ")}</Code> <Trans>are not unique</Trans>
    </p>
  )
}
