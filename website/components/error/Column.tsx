import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code } from "#components/common/Code.tsx"

export function ColumnMissingError(props: { error: fairspec.ColumnMissingError }) {
  return (
    <p>
      <Trans>The columns</Trans> <Code>{props.error.columnName}</Code>{" "}
      <Trans>are missing</Trans>
    </p>
  )
}

export function ColumnTypeError(props: { error: fairspec.ColumnTypeError }) {
  return (
    <p>
      <Trans>Column</Trans> <Code>{props.error.columnName}</Code>{" "}
      <Trans>is expected to be</Trans> <Code>{props.error.expectedColumnType}</Code>{" "}
      <Trans>but it is actually</Trans> <Code>{props.error.actualColumnType}</Code>
    </p>
  )
}
