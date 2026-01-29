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
    root: "../website/build/spa/client",
    server: { port: 5500 },
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
