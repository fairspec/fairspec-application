import { createFileRoute } from "@tanstack/react-router"
import { Feed } from "#components/feed/Feed.tsx"
import { Header } from "./-shared/Header.tsx"

export const Route = createFileRoute("/feeds/")({
  component: Component,
})

function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Feed
        title="Tech News Daily"
        linkCount={15}
        tags={["📝 inbox (10)", "📄 snoozed (5)", "💡 archived (1)"]}
      />
    </div>
  )
}
