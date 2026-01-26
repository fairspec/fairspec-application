import type * as fairspec from "@fairspec/metadata"
import { useLingui } from "@lingui/react/macro"
import { Code, Text } from "@mantine/core"
import { capitalize } from "es-toolkit"

export function MetadataError(props: { error: fairspec.MetadataError }) {
  const { t } = useLingui()

  return (
    <Text>
      {capitalize(t`${props.error.message}`)} {t`at`}{" "}
      <Code fz="lg" fw="bold">
        {props.error.jsonPointer}
      </Code>
    </Text>
  )
}
