import type * as fairspec from "@fairspec/metadata"
import { useLingui } from "@lingui/react/macro"

export function DataError(props: { error: fairspec.DataError }) {
  const { t } = useLingui()

  return <p>{t`${props.error.message}`}</p>
}
