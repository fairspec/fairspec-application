import { ClientOnly } from "@tanstack/react-router"
import { Breadcrumbs } from "./Breadcrumbs.tsx"
import { Close } from "./Close.tsx"
import { Language } from "./Language.tsx"
import { Links } from "./Links.tsx"
import { Logo } from "./Logo.tsx"
import { Share } from "./Share.tsx"
import { Theme } from "./Theme.tsx"

export function Header() {
  return (
    <header className="flex bg-gray-50 dark:bg-gray-800 gap-4 h-16 border-gray-200 dark:border-gray-700 px-2 md:px-4">
      <div className="mx-auto w-full flex gap-4 items-center justify-between">
        <Logo />
        <div className="hidden md:block">
          <Breadcrumbs />
        </div>
        <div className="flex gap-4 items-center">
          <Links />
          <Theme />
          <Language />
          <Share />
          <ClientOnly>
            <Close />
          </ClientOnly>
        </div>
      </div>
    </header>
  )
}
