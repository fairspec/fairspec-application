import { defineConfig, externalizeDepsPlugin } from "electron-vite"

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: { entry: "desktop/main.ts" },
      outDir: "build/main",
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: { entry: "desktop/preload.ts" },
      outDir: "build/preload",
    },
  },
  renderer: {
    root: "../website/render/client",
    build: {
      outDir: "build/renderer",
      rollupOptions: {
        input: {
          index: "../website/render/client/index.html",
        },
      },
    },
  },
})
