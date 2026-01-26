import { basename, dirname, join } from "node:path"
import { loadEnvFile } from "node:process"
import { configDefaults, coverageConfigDefaults, defineConfig } from "vitest/config"

try {
  loadEnvFile(join(import.meta.dirname, ".env"))
} catch {}

export default defineConfig({
  test: {
    include: ["**/*.spec.(ts|tsx)"],
    exclude: [...configDefaults.exclude, "**/build/**"],
    env: { NODE_OPTIONS: "--no-warnings" },
    testTimeout: 60 * 1000,
    passWithNoTests: true,
    silent: "passed-only",
    coverage: {
      enabled: true,
      reporter: ["html", "json"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/@*",
        "**/*.gen.ts",
        "**/build/**",
        "**/coverage/**",
        "**/examples/**",
        "**/generated/**",
        "**/messages.js",
      ],
    },
    resolveSnapshotPath: (testPath, snapExtension) => {
      return (
        join(dirname(testPath), "fixtures", "generated", basename(testPath)) +
        snapExtension
      )
    },
  },
})
