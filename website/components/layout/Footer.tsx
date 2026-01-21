import { Credits } from "./Credits.tsx"
import { Sitemap } from "./Sitemap.tsx"

export function Footer() {
  return (
    <footer className="flex flex-col gap-4">
      <Sitemap />
      <Credits />
    </footer>
  )
}
