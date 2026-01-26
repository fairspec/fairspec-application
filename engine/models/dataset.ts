import { z } from "zod"

export const ValidateDatasetInput = z.object({
  dataset: z.union([z.instanceof(File), z.httpUrl()]),
})
