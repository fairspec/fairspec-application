import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code, Text } from "@mantine/core"

export function ForeignKeyError(props: { error: fairspec.ForeignKeyError }) {
  return (
    <Text>
      <Trans>Foreign key violation in column(s)</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.foreignKey.columns.join(", ")}
      </Code>
      {": "}
      <Code fz="lg" fw="bold">
        {props.error.cells.join(", ")}
      </Code>
    </Text>
  )
}
