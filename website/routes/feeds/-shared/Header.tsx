import { Button } from "#blocks/button.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function Header() {
  return (
    <div className="flex items-center gap-4 justify-between py-1">
      <div className="flex gap-2 items-center text-md text-gray-600 pl-6">
        <icons.Feed
          strokeWidth={settings.ICON_STROKE_WIDTH}
          className="size-5"
        />
        You have X feeds
      </div>
      <div className="flex gap-0">
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
        >
          <icons.Search strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="text-xl">Search</span>
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
        >
          <icons.Refresh strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="text-xl">Refresh</span>
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
        >
          <icons.Add strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="text-xl">Import</span>
        </Button>
      </div>
    </div>
  )
}
