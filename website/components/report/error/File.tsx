import type * as fairspec from "@fairspec/metadata"
import { Trans } from "@lingui/react/macro"
import { Code, Text } from "@mantine/core"

export function TextualError(props: { error: fairspec.TextualError }) {
  return (
    <Text>
      <Trans>File</Trans> <Trans>is expected to be</Trans>{" "}
      <Trans>textual with utf-8 encoding</Trans>{" "}
      {props.error.actualEncoding && (
        <span>
          <Trans>but it is actually has</Trans>{" "}
          <Code fz="lg" fw="bold">
            {props.error.actualEncoding}
          </Code>
          <Trans>encoding</Trans>
        </span>
      )}
    </Text>
  )
}

export function IntegrityError(props: { error: fairspec.IntegrityError }) {
  return (
    <Text>
      <Trans>File hash</Trans> <Code>props.error.hashType</Code>{" "}
      <Trans>is expected to be</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.actualHash}
      </Code>{" "}
      <Trans>but it is actually</Trans>{" "}
      <Code fz="lg" fw="bold">
        {props.error.actualHash}
      </Code>
    </Text>
  )
}
