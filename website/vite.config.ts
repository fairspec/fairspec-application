import { cloudflare } from "@cloudflare/vite-plugin"
import { lingui } from "@lingui/vite-plugin"
import tailwind from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

// TODO: For some reason, electron-vite doesn't build correctly so we use this config
const isDesktop = !!process.env.DESKTOP

export default defineConfig({
  build: { outDir: isDesktop ? "desktop/build/renderer" : "build" },
  plugins: [
    devtools(),
    tailwind(),
    !isDesktop ? cloudflare({ viteEnvironment: { name: "ssr" } }) : undefined,
    tanstackStart({
      srcDirectory: ".",
      spa: {
        enabled: isDesktop,
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
})
