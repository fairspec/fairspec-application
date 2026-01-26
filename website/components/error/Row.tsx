import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code } from "#components/common/Code.tsx"

export function RowUniqueError(props: { error: fairspec.RowUniqueKeyError }) {
  return (
    <p>
      <Trans>The cell values of the fields</Trans>{" "}
      <Code>{props.error.columnNames.join(", ")}</Code> <Trans>are not unique</Trans>
    </p>
  )
}
