import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code } from "#components/common/Code.tsx"

export function TextualError(props: { error: fairspec.TextualError }) {
  return (
    <p>
      <Trans>File</Trans> <Trans>is expected to be</Trans>{" "}
      <Trans>textual with utf-8 encoding</Trans>{" "}
      {props.error.actualEncoding && (
        <span>
          <Trans>but it is actually has</Trans>{" "}
          <Code>
            {props.error.actualEncoding}
          </Code>
          <Trans>encoding</Trans>
        </span>
      )}
    </p>
  )
}

export function IntegrityError(props: { error: fairspec.IntegrityError }) {
  return (
    <p>
      <Trans>File hash</Trans> <Code>props.error.hashType</Code>{" "}
      <Trans>is expected to be</Trans>{" "}
      <Code>
        {props.error.actualHash}
      </Code>{" "}
      <Trans>but it is actually</Trans>{" "}
      <Code>
        {props.error.actualHash}
      </Code>
    </p>
  )
}
