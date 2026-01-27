import { Trans, useLingui } from "@lingui/react/macro"
import { useEffect, useState } from "react"
import { Button } from "#elements/button.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function Theme() {
  const { t } = useLingui()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Get initial theme from document
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
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
        <span className="hidden">
          <Trans>Light</Trans>
        </span>
      </div>
      <div className="gap-1 items-center hidden dark:flex">
        <icons.DarkTheme className="w-5 h-5" strokeWidth={settings.ICON_STROKE_WIDTH} />
        <span className="hidden">
          <Trans>Dark</Trans>
        </span>
      </div>
    </Button>
  )
}
