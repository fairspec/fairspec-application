import nodePath from "node:path"
import { getFileExtension } from "@fairspec/library"
import type { FileType } from "#models/file.ts"

export function getFilePath(
  source: string | File,
  options: {
    folder: string
    fileType: FileType
  },
) {
  const { fileType } = options

  if (!source) {
    return undefined
  }

  const extension = ["data", "table"].includes(fileType)
    ? getFileExtension(typeof source === "string" ? source : source.name)
    : "json"

  const fileName = `${fileType}.${extension}`
  const path = nodePath.join(options.folder, fileName)

  return path
}
