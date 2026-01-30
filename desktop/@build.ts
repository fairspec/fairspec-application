import dotenv from "dotenv"
import { execa } from "execa"
import tasuku from "tasuku"

process.chdir(import.meta.dirname)
dotenv.config({ path: ".env.local" })
const shell = execa({ stdout: ["inherit"], preferLocal: true, shell: true })

await shell`electron-vite build`

await tasuku(`Copying website build`, async () => {
  await shell`rm -rf build/renderer`
  await shell`cp -r ../website/build/client build/renderer`
})
