import { useLingui } from "@lingui/react/macro"
import { useMatches, useNavigate } from "@tanstack/react-router"
import { De, Es, Fr, Gb, It, Pt, Ru, Ua } from "react-flags-select"
import { Languages, type Language as LanguageType } from "#constants/language.ts"
import { Button } from "#elements/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#elements/dropdown-menu.tsx"
import { activateLocale } from "#helpers/locale.ts"
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
  const matches = useMatches()
  const navigate = useNavigate()
  const isDesktop = !!globalThis.desktop

  const onLanguageChange = (language: LanguageType) => {
    activateLocale(language.id)

    const path = matches.at(-1)?.fullPath
    if (path) {
      navigate({
        to: path,
        params: { languageSlug: language.slug },
        reloadDocument: !isDesktop,
      })
    }
  }

  const items = Object.values(Languages).map(language => {
    const Flag = LANGUAGE_FLAGS[language.id]
    return (
      <DropdownMenuItem
        key={language.id}
        onClick={() => onLanguageChange(language)}
        className="cursor-pointer"
      >
        <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
          <Flag fontSize={settings.ICON_SIZE} />
          {language.title}
        </div>
      </DropdownMenuItem>
    )
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="default"
            title={t`Change Language`}
            className="rounded-xl cursor-pointer"
          />
        }
      >
        <icons.Language strokeWidth={settings.ICON_STROKE_WIDTH} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-4 p-2">
        {items}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
