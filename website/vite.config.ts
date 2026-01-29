import { cloudflare } from "@cloudflare/vite-plugin"
import { lingui } from "@lingui/vite-plugin"
import tailwind from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

const isSpa = !!process.env.SPA

export default defineConfig({
  build: { outDir: isSpa ? "build/spa" : "build/ssr" },
  plugins: [
    devtools(),
    tailwind(),
    !isSpa ? cloudflare({ viteEnvironment: { name: "ssr" } }) : undefined,
    tanstackStart({
      srcDirectory: ".",
      spa: {
        enabled: isSpa,
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
