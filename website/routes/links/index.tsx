import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Link } from "#components/link/Link.tsx"
import { engine } from "#services/engine.ts"
import { Header } from "./-shared/Header.tsx"

export const Route = createFileRoute("/links/")({
  component: Component,
})

function Component() {
  const searchLinks = useQuery(engine.link.search.queryOptions({ input: {} }))

  if (!searchLinks.data) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <Header />
      {searchLinks.data.map(link => (
        <Link
          key={link.url}
          title={link.title}
          readingTime={`${link.readingTime} min read`}
          tags={link.tags.map(tag => `${tag.emoji} ${tag.keyword}`)}
        />
      ))}
    </div>
  )
}
