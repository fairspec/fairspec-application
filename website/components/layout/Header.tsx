import { Breadcrumbs } from "./Breadcrumbs.tsx"
import { Language } from "./Language.tsx"
import { Logo } from "./Logo.tsx"
import { Share } from "./Share.tsx"
import { Theme } from "./Theme.tsx"
import { User } from "./User.tsx"

export function Header() {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-800 gap-4 py-4 border-b border-gray-200 ">
      <div className="container mx-auto px-4 max-w-screen-lg flex gap-4 items-center justify-between">
        <Logo />
        <Breadcrumbs />
        <div className="flex gap-4 items-center">
          <Theme />
          <Language />
          <Share />
          <User />
        </div>
      </div>
    </div>
  )
}
