import { useUser } from "@clerk/tanstack-react-start"
import { Trans } from "@lingui/react/macro"
import { Button } from "#blocks/button.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function User() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    return (
      <Button
        variant="outline"
        size="default"
        className="rounded-xl cursor-pointer"
        title="Log Out"
      >
        <icons.LogOut strokeWidth={settings.ICON_STROKE_WIDTH} />
        <span className="hidden">
          <Trans>Log Out</Trans>
        </span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="default"
      className="rounded-xl cursor-pointer"
      title="Log In"
    >
      <icons.LogIn strokeWidth={settings.ICON_STROKE_WIDTH} />
      <span className="hidden">
        <Trans>Log In</Trans>
      </span>
    </Button>
  )
}
