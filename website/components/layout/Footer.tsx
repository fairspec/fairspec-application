import { Link } from "@tanstack/react-router"
import { Languages } from "#constants/language.ts"

export function Footer() {
  return (
    <footer className="hidden">
      {Object.values(Languages).map(language => (
        <Link
          key={language.id}
          to="/{-$languageSlug}"
          params={{ languageSlug: language.slug }}
        >
          {language.title}
        </Link>
      ))}
    </footer>
  )
}
