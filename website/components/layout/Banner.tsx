import { Trans } from "@lingui/react/macro"
import { Link } from "@tanstack/react-router"

export function Banner() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white text-center py-4 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4">
        <p>
          <Trans>Support the project by</Trans>{" "}
          <Link
            to="https://github.com/sponsors/datisthq"
            rel="noopener noreferrer"
            className="text-primary font-bold underline"
          >
            <Trans>becoming a sponsor</Trans>
          </Link>{" "}
          <Trans>or</Trans>{" "}
          <Link
            to="https://github.com/datisthq/dpkit/stargazers"
            rel="noopener noreferrer"
            className="text-primary font-bold underline"
          >
            <Trans>adding a star</Trans>
          </Link>{" "}
          <Trans>on GitHub!</Trans>
        </p>
      </div>
    </div>
  )
}
