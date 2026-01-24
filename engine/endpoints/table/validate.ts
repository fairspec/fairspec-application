import { publicEndpoint } from "#endpoints/base/public.ts"
import { ValidateTableInput } from "#models/table.ts"

export const validateTableEndpoint = publicEndpoint
  .input(ValidateTableInput)
  .handler(async ({ input }) => {
    console.log(input)
    return { valid: true, errors: [] }
  })
