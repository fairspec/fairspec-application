// import { validateDataset } from "@fairspec/library"
import { temporaryDirectoryTask } from "tempy"
import { prefetchFile } from "#action/file/fetch.ts"
import { publicEndpoint } from "#endpoints/base/public.ts"
import { InferDatasetInput } from "#models/dataset.ts"

export const inferDatasetEndpoint = publicEndpoint
  .input(InferDatasetInput)
  .handler(async ({ input }) => {
    return await temporaryDirectoryTask(async folder => {
      const file = await prefetchFile(input.file, { folder, fileType: "file" })
      console.log(file)

      // TODO: Implement

      return { resources: [] }
    })
  })
