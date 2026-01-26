import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code, Text } from "@mantine/core"

export function ColumnsMissingError(props: {
  error: fairspec.ColumnMissingError
}) {
  return (
    <Text>
      <Trans>The columns</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.columnName}
      </Code>{" "}
      <Trans>are missing</Trans>
    </Text>
  )
}

export function ColumnTypeError(props: { error: fairspec.ColumnTypeError }) {
  return (
    <Text>
      <Trans>Column</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.columnName}
      </Code>{" "}
      <Trans>is expected to be</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.expectedColumnType}
      </Code>{" "}
      <Trans>but it is actually</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.actualColumnType}
      </Code>
    </Text>
  )
}
