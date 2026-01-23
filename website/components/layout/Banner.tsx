import { Trans } from "@lingui/react/macro"
import { Link } from "@tanstack/react-router"

export function Banner() {
  return (
    <div className="text-gray-500 text-center py-2.5 bg-gray-50 h-full dark:bg-gray-800">
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
