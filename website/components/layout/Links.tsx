import { Link } from "@tanstack/react-router"
import * as icons from "#icons.ts"

export function Links() {
  return (
    <div className="hidden lg:flex gap-1 items-center">
      <Link
        to="/"
        className="p-2 underline"
        style={{ color: "rgb(44, 124, 253)" }}
      >
        <strong>Application</strong>
      </Link>
      <Link
        to="https://fairspec.org"
        className="p-2"
        style={{ color: "rgb(44, 124, 253)" }}
      >
        <strong>Standard</strong>
      </Link>
      <Link
        to="https://typescript.fairspec.org"
        className="p-2"
        style={{ color: "rgb(44, 124, 253)" }}
      >
        <strong>TypeScript</strong>
      </Link>
      <Link
        to="https://github.com/fairspec/fairspec-application"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 flex items-center gap-2"
        style={{ color: "rgb(44, 124, 253)" }}
      >
        <icons.GitHub className="w-4 h-4" />
      </Link>
    </div>
  )
}
