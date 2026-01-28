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
      lib: { entry: "processes/preload/preload.ts" },
      outDir: "build/preload",
    },
  },
  renderer: {
    root: "node_modules/@fairspec/website/build/spa/client",
    build: {
      outDir: "build/renderer",
      rollupOptions: {
        input: {
          index: "node_modules/@fairspec/website/build/spa/client/index.html",
        },
      },
    },
  },
})
