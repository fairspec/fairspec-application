import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code, Text } from "@mantine/core"

export function RowUniqueError(props: { error: fairspec.RowUniqueKeyError }) {
  return (
    <Text>
      <Trans>The cell values of the fields</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.columnNames.join(", ")}
      </Code>{" "}
      <Trans>are not unique</Trans>
    </Text>
  )
}
