import { Link, useRouterState } from "@tanstack/react-router"
// @ts-expect-error
import LogoIcon from "#assets/fairspec-logo.svg?react"
import * as icons from "#icons.ts"

export function Logo() {
  const routerState = useRouterState()
  const isProgress = routerState.status === "pending"

  const Icon = isProgress ? icons.Pending : LogoIcon
  const iconClassName = isProgress ? "animate-spin" : undefined

  return (
    <Link to="/" className="no-underline">
      <div className="h-full flex flex-nowrap gap-2 items-center pl-2">
        <div className="w-9 h-9 flex items-center justify-center">
          <Icon className={iconClassName} />
        </div>
        <h3 className="leading-none line-clamp-2 text-xl font-bold text-primary dark:text-white ">
          Fairspec Application
        </h3>
      </div>
    </Link>
  )
}
