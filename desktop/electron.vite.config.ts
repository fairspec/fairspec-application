import { defineConfig } from "electron-vite"

export default defineConfig({
  main: {
    build: {
      lib: { entry: "processes/main/main.ts" },
      outDir: "build/main",
    },
  },
  preload: {
    build: {
      lib: {
        entry: "processes/preload/preload.ts",
        formats: ["cjs"],
      },
      outDir: "build/preload",
      rollupOptions: {
        output: {
          entryFileNames: "preload.js",
        },
      },
    },
  },
  renderer: {
    root: "processes/renderer",
    server: { port: 5000 },
    build: {
      outDir: "build/renderer",
      rollupOptions: {
        input: {
          index: "processes/renderer/index.html",
        },
      },
    },
  },
})
