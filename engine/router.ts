import { inferDataSchemaEndpoint } from "#endpoints/dataSchema/infer.ts"
import { validateDatasetEndpoint } from "#endpoints/dataset/validate.ts"
import { inferDialectEndpoint } from "#endpoints/dialect/infer.ts"
import { validateTableEndpoint } from "#endpoints/table/validate.ts"
import { inferTableSchemaEndpoint } from "#endpoints/tableSchema/infer.ts"
import { validateDataEndpoint } from "./endpoints/data/validate.ts"
import { validateFileEndpoint } from "./endpoints/file/validate.ts"

export const router = {
  data: {
    validate: validateDataEndpoint,
    inferSchema: inferDataSchemaEndpoint,
  },
  dataset: {
    validate: validateDatasetEndpoint,
  },
  dialect: {
    infer: inferDialectEndpoint,
  },
  file: {
    validate: validateFileEndpoint,
  },
  table: {
    validate: validateTableEndpoint,
    inferSchema: inferTableSchemaEndpoint,
  },
}

export type Router = typeof router
