import type { FairspecError } from "@fairspec/metadata"
import {
  CellEnumError,
  CellExclusiveMaximumError,
  CellExclusiveMinimumError,
  CellMaximumError,
  CellMaxLengthError,
  CellMinimumError,
  CellMinLengthError,
  CellPatternError,
  CellRequiredError,
  CellTypeError,
  CellUniqueError,
} from "./Cell.tsx"
import { ColumnMissingError, ColumnTypeError } from "./Column.tsx"
import { DataError } from "./Data.tsx"
import { IntegrityError, TextualError } from "./File.tsx"
import { ForeignKeyError } from "./ForeignKey.tsx"
import { MetadataError } from "./Metadata.tsx"
import { RowUniqueError } from "./Row.tsx"

export function Error(props: { error: FairspecError }) {
  const { error } = props

  switch (error.type) {
    case "metadata":
      return <MetadataError error={error} />
    case "data":
      return <DataError error={error} />
    case "file/textual":
      return <TextualError error={error} />
    case "file/integrity":
      return <IntegrityError error={error} />
    case "column/missing":
      return <ColumnMissingError error={error} />
    case "column/type":
      return <ColumnTypeError error={error} />
    case "row/uniqueKey":
      return <RowUniqueError error={error} />
    case "cell/type":
      return <CellTypeError error={error} />
    case "cell/required":
      return <CellRequiredError error={error} />
    case "cell/minimum":
      return <CellMinimumError error={error} />
    case "cell/maximum":
      return <CellMaximumError error={error} />
    case "cell/exclusiveMinimum":
      return <CellExclusiveMinimumError error={error} />
    case "cell/exclusiveMaximum":
      return <CellExclusiveMaximumError error={error} />
    case "cell/minLength":
      return <CellMinLengthError error={error} />
    case "cell/maxLength":
      return <CellMaxLengthError error={error} />
    case "cell/pattern":
      return <CellPatternError error={error} />
    case "cell/unique":
      return <CellUniqueError error={error} />
    case "cell/enum":
      return <CellEnumError error={error} />
    case "foreignKey":
      return <ForeignKeyError error={error} />
    default:
      return null
  }
}
