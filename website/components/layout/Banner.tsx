import { Link } from "@tanstack/react-router"

// TODO: recover
// import { Trans } from "@lingui/react/macro"
function Trans({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function Banner() {
  return (
    <div className="text-white text-center py-2.5 bg-blue-500">
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
            className="text-white font-bold underline"
          >
            <Trans>feedback and ideas</Trans>
          </Link>
        </p>
      </div>
    </div>
  )
}
