import { Button } from "#blocks/button.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"
import { Import } from "./Import.tsx"

export function Header() {
  return (
    <div className="flex items-center gap-4 py-1 justify-between">
      <div className="flex gap-2 items-center text-md text-muted-foreground pl-6">
        <icons.Stats
          strokeWidth={settings.ICON_STROKE_WIDTH}
          className="size-5"
        />
        You have X links
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
        <Import />
      </div>
    </div>
  )
}
