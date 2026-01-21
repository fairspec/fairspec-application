import { useLingui } from "@lingui/react/macro"
import { De, Es, Fr, Gb, It, Pt, Ru, Ua } from "react-flags-select"
import { Button } from "#blocks/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#blocks/dropdown-menu.tsx"
import { type LanguageId, Languages } from "#constants/language.ts"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

const LANGUAGE_FLAGS = {
  de: De,
  en: Gb,
  es: Es,
  fr: Fr,
  it: It,
  pt: Pt,
  ru: Ru,
  uk: Ua,
} as const

export function Language() {
  const { t } = useLingui()

  const onLanguageChange = (languageId: LanguageId) => {
    const location = globalThis.location
    if (location) {
      location.href = `/${languageId}`
    }
  }

  const items = Object.values(Languages).map(item => {
    const Flag = LANGUAGE_FLAGS[item.languageId as LanguageId]
    return (
      <DropdownMenuItem
        key={item.languageId}
        onClick={() => onLanguageChange(item.languageId)}
        className="cursor-pointer"
      >
        <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
          <Flag fontSize={settings.ICON_SIZE} />
          {item.title}
        </div>
      </DropdownMenuItem>
    )
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          title={t`Change Language`}
          className="rounded-xl cursor-pointer"
        >
          <icons.Language strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="hidden">English</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-4 p-2">
        {items}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
