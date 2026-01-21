import { z } from "zod"
import { countLinks } from "#actions/link/count.ts"
import { publicEndpoint } from "#endpoints/base/public.ts"
import { SearchConfig } from "#models/search.ts"

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
