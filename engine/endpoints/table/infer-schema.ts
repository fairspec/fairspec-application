import { inferTableSchema } from "@fairspec/library"
import { temporaryDirectoryTask } from "tempy"
import { prefetchFile } from "#action/file/fetch.ts"
import { publicEndpoint } from "#endpoints/base/public.ts"
import { InferSchemaInput } from "#models/table.ts"

export const inferSchemaEndpoint = publicEndpoint
  .input(InferSchemaInput)
  .handler(async ({ input }) => {
    return await temporaryDirectoryTask(async folder => {
      const [table, dialect] = await Promise.all([
        prefetchFile(input.table, { folder, fileType: "table" }),
        prefetchFile(input.dialect, { folder, fileType: "dialect" }),
      ])

      const schema = await inferTableSchema({
        data: table,
        dialect,
      })

      return schema
    })
  })
