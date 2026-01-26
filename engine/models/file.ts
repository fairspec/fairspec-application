import { z } from "zod"

export const FileType = z.enum(["file", "data", "table", "schema", "dialect", "dataset"])

export type FileType = z.infer<typeof FileType>
