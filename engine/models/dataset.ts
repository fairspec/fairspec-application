import { z } from "zod"

export const InferDatasetInput = z.object({
  file: z.union([z.instanceof(File), z.httpUrl()]),
})

export const ValidateDatasetInput = z.object({
  dataset: z.union([z.instanceof(File), z.httpUrl()]),
})
