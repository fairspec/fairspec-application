import { useLingui } from "@lingui/react/macro"
import { Button } from "#elements/button.tsx"
import { getCurrentTheme, setTheme } from "#helpers/theme.ts"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function Theme() {
  const { t } = useLingui()

  const handleToggle = async () => {
    const oldTheme = getCurrentTheme()
    const newTheme = oldTheme === "light" ? "dark" : "light"
    await setTheme(newTheme)
  }

  return (
    <Button
      variant="outline"
      size="default"
      onClick={handleToggle}
      title={t`Change Theme`}
      aria-label="Toggle color scheme"
      className="rounded-xl cursor-pointer"
    >
      <div className="flex gap-1 items-center dark:hidden">
        <icons.LightTheme className="w-5 h-5" strokeWidth={settings.ICON_STROKE_WIDTH} />
      </div>
      <div className="gap-1 items-center hidden dark:flex">
        <icons.DarkTheme className="w-5 h-5" strokeWidth={settings.ICON_STROKE_WIDTH} />
      </div>
    </Button>
  )
}
