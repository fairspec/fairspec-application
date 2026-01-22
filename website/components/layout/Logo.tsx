import { Link } from "@tanstack/react-router"
// @ts-expect-error
import LogoIcon from "#assets/fairspec-logo.svg?react"

export function Logo() {
  return (
    <Link to="/" className="no-underline">
      <div className="h-full flex flex-nowrap gap-2 items-center pl-2">
        <div className="w-9 h-9 flex items-center justify-center">
          <LogoIcon />
        </div>
        <h3 className="leading-none line-clamp-2 text-xl font-bold text-primary dark:text-white ">
          Fairspec Application
        </h3>
      </div>
    </Link>
  )
}
