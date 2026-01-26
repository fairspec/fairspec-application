import { createWriteStream } from "node:fs"
import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"
import { Readable, Transform } from "node:stream"
import { pipeline } from "node:stream/promises"
import * as settings from "#settings.ts"

// TODO: Bypass for local files in the Desktop App

export async function prefetchFile(
  source: string | File,
  options: {
    targetPath: string
    fileType: "data" | "metadata"
  },
) {
  const { targetPath, fileType } = options

  const maxBytes =
    fileType === "data" ? settings.DATA_MAX_BYTES : settings.METADATA_MAX_BYTES

  const webStream =
    typeof source === "string" ? (await fetch(source)).body : source.stream()

  if (!webStream) {
    throw new Error("Invalid file source")
  }

  // @ts-expect-error
  const stream = Readable.fromWeb(webStream)

  if (maxBytes) {
    stream.pipe(limitStreamSize(stream, maxBytes))
  }

  // It is an equivalent to ensureDir function that won't overwrite an existing directory
  await mkdir(dirname(targetPath), { recursive: true })

  await pipeline(
    stream,
    // The "wx" flag ensures that the file won't overwrite an existing file
    createWriteStream(targetPath, { flags: "wx" }),
  )
}

function limitStreamSize(inputStream: Readable, maxBytes: number) {
  let total = 0
  return inputStream.pipe(
    new Transform({
      transform(chunk, _encoding, callback) {
        if (total >= maxBytes) {
          throw new Error("File size exceeds the limit")
        }

        total += chunk.length
        callback(null, chunk)
      },
    }),
  )
}
