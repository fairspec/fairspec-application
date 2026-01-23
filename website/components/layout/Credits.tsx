import { Trans } from "@lingui/react/macro"
import { Link } from "@tanstack/react-router"
import datistLogoTextDark from "#assets/datist-logo-text-dark.svg"
import datistLogoTextLight from "#assets/datist-logo-text-light.svg"

export function Credits() {
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <article className="flex flex-col gap-2 items-center max-w-160 mx-auto py-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          <Trans>Brought to you by</Trans>
        </p>
        <div className="p-[15px] rounded-[15px] border border-dashed border-gray-300">
          <Link
            to="https://datist.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={datistLogoTextLight}
              alt="Datist"
              className="w-[250px] rounded-md block dark:hidden"
            />
            <img
              src={datistLogoTextDark}
              alt="Datist"
              className="w-[250px] rounded-md hidden dark:block"
            />
          </Link>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-[50ch]">
          <Trans>
            We are bringing technological innovation and consultancy services to
            the open data field
          </Trans>
        </p>
      </article>
    </div>
  )
}
