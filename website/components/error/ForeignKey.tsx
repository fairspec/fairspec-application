import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code } from "#components/common/Code.tsx"

export function ForeignKeyError(props: { error: fairspec.ForeignKeyError }) {
  return (
    <p>
      <Trans>Foreign key violation in column(s)</Trans>{" "}
      <Code>{props.error.foreignKey.columns.join(", ")}</Code>
      {": "}
      <Code>{props.error.cells.join(", ")}</Code>
    </p>
  )
}
