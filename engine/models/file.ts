import { z } from "zod"

export const FileType = z.enum(["table", "schema", "dialect"])

export type FileType = z.infer<typeof FileType>
