import { Link, useParams } from "@tanstack/react-router"
// @ts-expect-error
import LogoIcon from "#assets/fairspec-logo.svg?react"

export function Logo() {
  const { languageId } = useParams({ strict: false })

  return (
    <Link to="/$languageId" params={{ languageId }} className="no-underline">
      <div className="h-full flex flex-nowrap gap-2 items-center pl-2">
        <div className="w-10 h-10 flex items-center justify-center">
          <LogoIcon />
        </div>
        <h3 className="leading-none line-clamp-2 text-xl font-bold text-blue-500">
          Fairspec Application
        </h3>
      </div>
    </Link>
  )
}
