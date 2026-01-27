import { z } from "zod"

export const ValidateDataInput = z.object({
  data: z.union([z.instanceof(File), z.httpUrl()]),
  schema: z.union([z.instanceof(File), z.httpUrl(), z.literal("")]),
})
