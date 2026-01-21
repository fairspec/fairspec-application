import { createFileRoute } from "@tanstack/react-router"
import { Link } from "#components/link/Link.tsx"
import { Header } from "./-shared/Header.tsx"

export const Route = createFileRoute("/favorites/")({
  component: Component,
})

function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Link
        title="Lorem Ipsum Dolor Sit Amet"
        readingTime="5 min read"
        tags={["📝 lorem", "📄 ipsum", "💡 example"]}
      />
      <Link
        title="Consectetur Adipiscing Elit"
        readingTime="3 min read"
        tags={["📚 tutorial", "🗺 guide"]}
      />
      <Link
        title="Sed Do Eiusmod Tempor Incididunt"
        readingTime="8 min read"
        tags={["💻 development", "⌨ coding", "✨ best-practices"]}
      />
      <Link
        title="Ut Labore Et Dolore Magna Aliqua"
        readingTime="6 min read"
        tags={["🎨 design", "🖼 ui"]}
      />
    </div>
  )
}
