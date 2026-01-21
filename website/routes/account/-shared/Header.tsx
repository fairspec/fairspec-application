import { Link } from "@tanstack/react-router"
import { Button } from "#blocks/button.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function Header() {
  return (
    <div className="flex items-center gap-4 justify-between py-1">
      <div className="flex gap-2 items-center text-md text-gray-600 pl-6">
        <icons.Account
          strokeWidth={settings.ICON_STROKE_WIDTH}
          className="size-5"
        />
        Managing account
      </div>
      <div className="flex gap-0">
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
          asChild
        >
          <Link to="/account">
            <icons.Settings strokeWidth={settings.ICON_STROKE_WIDTH} />
            <span className="text-xl">Settings</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
          asChild
        >
          <Link to="/account/plans">
            <icons.Plan strokeWidth={settings.ICON_STROKE_WIDTH} />
            <span className="text-xl">Plans</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
          asChild
        >
          <Link to="/account/backups">
            <icons.History strokeWidth={settings.ICON_STROKE_WIDTH} />
            <span className="text-xl">Backups</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
          asChild
        >
          <Link to="/account/help">
            <icons.Help strokeWidth={settings.ICON_STROKE_WIDTH} />
            <span className="text-xl">Help</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
