import { validateDatasetEndpoint } from "#endpoints/dataset/validate.ts"
import { validateTableEndpoint } from "#endpoints/table/validate.ts"

export const router = {
  dataset: {
    validate: validateDatasetEndpoint,
  },
  table: {
    validate: validateTableEndpoint,
  },
}

export type Router = typeof router
