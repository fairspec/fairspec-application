import { cloudflare } from "@cloudflare/vite-plugin"
import { lingui } from "@lingui/vite-plugin"
import tailwind from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

const isDesktop = !!process.env.DESKTOP
const buildFolder = isDesktop ? "../desktop/build/website" : "./build"

export default defineConfig({
  build: { outDir: buildFolder },
  plugins: [
    devtools(),
    tailwind(),
    !isDesktop ? cloudflare({ viteEnvironment: { name: "ssr" } }) : undefined,
    tanstackStart({
      srcDirectory: ".",
      spa: { enabled: isDesktop },
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
