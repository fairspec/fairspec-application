import { cloudflare } from "@cloudflare/vite-plugin"
import { lingui } from "@lingui/vite-plugin"
import tailwind from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// import babel from "vite-plugin-babel"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    devtools(),
    // @ts-expect-error
    tailwind(),
    // @ts-expect-error
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      srcDirectory: ".",
    }),
    // babel({
    //   filter: /\.tsx?$/u,
    //   babelConfig: {
    //     presets: ["@babel/preset-typescript"],
    //     plugins: ["@lingui/babel-plugin-lingui-macro"],
    //   },
    // }),
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    lingui(),
    svgr(),
  ],
})
