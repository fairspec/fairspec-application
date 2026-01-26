import type * as fairspec from "@fairspec/metadata"
import { useLingui } from "@lingui/react/macro"
import { Text } from "@mantine/core"

export function DataError(props: { error: fairspec.DataError }) {
  const { t } = useLingui()

  return <Text>{t`${props.error.message}`}</Text>
}
