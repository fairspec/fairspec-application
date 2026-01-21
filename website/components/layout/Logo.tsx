import { Link, useRouterState } from "@tanstack/react-router"
// @ts-expect-error
import LogoIcon from "#assets/datist-logo.svg?react"
import * as icons from "#icons.ts"

export function Logo(props: { title?: string; Icon?: any; to?: string }) {
  const routerState = useRouterState()
  const isProgress = routerState.status === "pending"

  const title = props.title ?? "keepHero"
  const Icon = isProgress ? icons.Pending : props.Icon || LogoIcon
  const iconClassName = isProgress ? "animate-spin" : undefined

  const PlainLogo = () => {
    return (
      <div className="h-full flex flex-nowrap gap-1 items-center pl-2">
        <div className="w-9 h-9 flex items-center justify-center">
          <Icon className={iconClassName} />
        </div>
        <h3 className="leading-none line-clamp-2 text-xl font-bold text-black dark:text-white ">
          {title}
        </h3>
      </div>
    )
  }

  return (
    <Link to="/" className="no-underline">
      <PlainLogo />
    </Link>
  )
}
