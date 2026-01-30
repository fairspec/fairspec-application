import dotenv from "dotenv"
import { execa } from "execa"

process.chdir(import.meta.dirname)
dotenv.config({ path: ".env.local" })
const shell = execa({ stdout: ["inherit"], preferLocal: true, shell: true })

// Desktop

await shell`DESKTOP=true vite build`
await shell`rm -rf ../desktop/build/renderer`
await shell`cp -r build/client ../desktop/build/renderer`

// Website

await shell`vite build`
