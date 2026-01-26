import { Trans } from "@lingui/react/macro"
import { Link } from "@tanstack/react-router"

export function Banner() {
  return (
    <div className="text-white text-center py-2.5 bg-blue-500 h-full dark:text-black">
      <div className="mx-auto px-4">
        <p>
          <Trans>This project is in</Trans>{" "}
          <strong>
            <Trans>research preview</Trans>
          </strong>{" "}
          <Trans>phase. Please share your</Trans>{" "}
          <Link
            to="https://github.com/fairspec/fairspec/issues/new"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            <Trans>feedback and ideas</Trans>
          </Link>
        </p>
      </div>
    </div>
  )
}
