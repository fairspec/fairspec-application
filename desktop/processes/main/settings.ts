import nodePath from "node:path"

export const APP_NAME = "fairspec"
export const APP_WEBSITE = "https://application.fairspec.org"
export const APP_USER_MODEL_ID = "org.fairspec.application"

export const WEBSITE_FOLDER = nodePath.join(
  import.meta.dirname,
  "..",
  "..",
  "node_modules",
  "@fairspec",
  "website",
  "build",
  "spa",
  "client",
)
