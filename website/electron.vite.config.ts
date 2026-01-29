import { lingui } from "@lingui/vite-plugin"
import tailwind from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "electron-vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  main: {
    build: {
      lib: { entry: "desktop/processes/main/main.ts" },
      outDir: "desktop/build/main",
    },
  },
  preload: {
    build: {
      lib: {
        entry: "desktop/processes/preload/preload.ts",
        formats: ["cjs"],
      },
      outDir: "desktop/build/preload",
      rollupOptions: {
        output: {
          entryFileNames: "preload.js",
        },
      },
    },
  },
  renderer: {
    root: ".",
    server: { port: 5000 },
    build: {
      outDir: "desktop/build/renderer",
      rollupOptions: {
        input: {
          index: "desktop/build/renderer/client/index.html",
        },
      },
    },
    plugins: [
      devtools(),
      tailwind(),
      tanstackStart({
        srcDirectory: ".",
        spa: {
          enabled: true,
          prerender: { outputPath: "/index.html" },
        },
      }),
      react({
        babel: {
          plugins: ["@lingui/babel-plugin-lingui-macro"],
        },
      }),
      lingui(),
      svgr(),
    ],
  },
})
