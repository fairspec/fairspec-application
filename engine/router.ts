import { validateDatasetEndpoint } from "#endpoints/dataset/validate.ts"

export const router = {
  dataset: {
    validate: validateDatasetEndpoint,
  },
}

export type Router = typeof router
