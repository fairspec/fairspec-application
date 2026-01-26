import { validateData } from "@fairspec/library"
import { temporaryDirectoryTask } from "tempy"
import { prefetchFile } from "#action/file/fetch.ts"
import { publicEndpoint } from "#endpoints/base/public.ts"
import { ValidateDataInput } from "#models/data.ts"

export const validateDataEndpoint = publicEndpoint
  .input(ValidateDataInput)
  .handler(async ({ input }) => {
    return await temporaryDirectoryTask(async folder => {
      const [table, schema] = await Promise.all([
        prefetchFile(input.data, { folder, fileType: "table" }),
        prefetchFile(input.schema, { folder, fileType: "schema" }),
      ])

      const report = await validateData({
        data: table,
        dataSchema: schema,
      })

      return report
    })
  })
