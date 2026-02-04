import { Trans, useLingui } from "@lingui/react/macro"
import { Button } from "#elements/button.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function Close() {
  const { t } = useLingui()

  if (!globalThis.desktop) {
    return null
  }

  const handleClose = () => {
    globalThis.window?.close()
  }

  return (
    <Button
      variant="outline"
      size="default"
      title={t`Close Application`}
      className="rounded-xl cursor-pointer"
      onClick={handleClose}
    >
      <icons.Close strokeWidth={settings.ICON_STROKE_WIDTH} />
      <span className="hidden">
        <Trans>Close</Trans>
      </span>
    </Button>
  )
}
