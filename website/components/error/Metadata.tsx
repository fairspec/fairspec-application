import type * as fairspec from "@fairspec/metadata"
import { useLingui } from "@lingui/react/macro"
import { capitalize } from "es-toolkit"
import { Code } from "#components/common/Code.tsx"

export function MetadataError(props: { error: fairspec.MetadataError }) {
  const { t } = useLingui()

  return (
    <p>
      {capitalize(t`${props.error.message}`)} {t`at`}{" "}
      <Code>{props.error.jsonPointer}</Code>
    </p>
  )
}
