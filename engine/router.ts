import { validateDatasetEndpoint } from "#endpoints/dataset/validate.ts"

export const router = {
  link: {
    search: validateDatasetEndpoint,
  },
}

export type Router = typeof router
