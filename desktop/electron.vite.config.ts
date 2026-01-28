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
    root: "../website/build/spa/client",
    server: { port: 5000 },
    build: {
      outDir: "build/renderer",
      rollupOptions: {
        input: {
          index: "../website/build/spa/client/index.html",
        },
      },
    },
  },
})
