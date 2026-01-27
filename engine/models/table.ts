import { z } from "zod"

export const ValidateTableInput = z.object({
  table: z.union([z.instanceof(File), z.httpUrl()]),
  schema: z.union([z.instanceof(File), z.httpUrl(), z.literal("")]),
  dialect: z.union([z.instanceof(File), z.httpUrl(), z.literal("")]),
})

export const InferSchemaInput = z.object({
  table: z.union([z.instanceof(File), z.httpUrl()]),
  dialect: z.union([z.instanceof(File), z.httpUrl(), z.literal("")]),
})
