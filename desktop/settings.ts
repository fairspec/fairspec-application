import nodePath from "node:path"

export const APP_NAME = "fairspec"
export const APP_WEBSITE = "https://application.fairspec.org"
export const APP_USER_MODEL_ID = "org.fairspec.application"

// TODO: review
export const RENDERER_DIR = nodePath.join(
  import.meta.dirname,
  "..",
  "..",
  "node_modules",
  "@dpkit",
  "website",
  "build",
  "spa",
  "client",
)
