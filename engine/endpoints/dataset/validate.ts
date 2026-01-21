import { z } from "zod"
import { publicEndpoint } from "#endpoints/base/public.ts"

export const validateDatasetEndpoint = publicEndpoint
  .input(
    z.object({
      test: z.string(),
    }),
  )
  .output(z.string())
  .handler(async ({ input }) => {
    return input.test
  })
