import dotenv from "dotenv"
import { execa } from "execa"

process.chdir(import.meta.dirname)
dotenv.config({ path: ".env.local" })
const shell = execa({ stdout: ["inherit"], preferLocal: true, shell: true })

await shell`electron-builder`
