import { Trans } from "@lingui/react/macro"
import { Alert, AlertDescription, AlertTitle } from "#elements/custom/alert.tsx"

export function DesktopAlert() {
  if (globalThis.desktop) {
    return null
  }

  return (
    <Alert variant="tip" className="mt-2">
      <AlertTitle className="text-xl">
        <Trans>Desktop App Available</Trans>
      </AlertTitle>
      <AlertDescription className="text-base">
        <Trans>
          For faster and privacy-first work, download the{" "}
          <a
            href="https://github.com/fairspec/fairspec-application/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            desktop application
          </a>
        </Trans>
      </AlertDescription>
    </Alert>
  )
}
