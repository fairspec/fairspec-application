import { TsLogTransport } from "@loglayer/transport-tslog"
import { LogLayer } from "loglayer"
import { Logger } from "tslog"

export function createLoggerService() {
  return new LogLayer({
    transport: new TsLogTransport({
      logger: new Logger({
        type: "pretty",
        hideLogPositionForProduction: true,
      }),
    }),
  })
}
