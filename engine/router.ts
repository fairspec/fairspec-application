import { validateDatasetEndpoint } from "#endpoints/dataset/validate.ts"
import { validateTableEndpoint } from "#endpoints/table/validate.ts"
import { validateDataEndpoint } from "./endpoints/data/validate.ts"

export const router = {
  dataset: {
    validate: validateDatasetEndpoint,
  },
  table: {
    validate: validateTableEndpoint,
  },
  data: {
    validate: validateDataEndpoint,
  },
}

export type Router = typeof router
