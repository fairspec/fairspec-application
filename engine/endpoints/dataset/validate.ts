// import { validateDataset } from "@fairspec/library"
import { temporaryDirectoryTask } from "tempy"
import { prefetchFile } from "#action/file/fetch.ts"
import { publicEndpoint } from "#endpoints/base/public.ts"
import { ValidateDatasetInput } from "#models/dataset.ts"

export const validateDatasetEndpoint = publicEndpoint
  .input(ValidateDatasetInput)
  .handler(async ({ input }) => {
    return await temporaryDirectoryTask(async folder => {
      const dataset = await prefetchFile(input.dataset, { folder, fileType: "dataset" })
      console.log(dataset)

      // TODO: Implement

      return { valid: true, errors: [] }
    })
  })
