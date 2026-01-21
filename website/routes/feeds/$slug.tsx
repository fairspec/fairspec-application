import { createFileRoute, Link as TanstackLink } from "@tanstack/react-router"
import { Button } from "#blocks/button.tsx"
import { Feed } from "#components/feed/Feed.tsx"
import { Link } from "#components/link/Link.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export const Route = createFileRoute("/feeds/$slug")({
  component: Component,
})

function Component() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="sticky top-0 z-10 bg-background pt-4 -mx-2 px-2 mb-4">
        <div className="shadow-md rounded-xl">
          <Feed
            title="Tech News Daily"
            linkCount={15}
            tags={["📬 inbox (10)", "⏰ snoozed (3)", "📦 archived (2)"]}
            selected
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
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
    </div>
  )
}

export function Header() {
  return (
    <div className="flex items-center gap-4 py-1 justify-between">
      <TanstackLink
        to="/feeds"
        className="text-md text-muted-foreground pl-2 hover:text-primary flex items-center gap-2"
      >
        <icons.Return
          strokeWidth={settings.ICON_STROKE_WIDTH}
          className="size-5"
        />
        Return to feeds
      </TanstackLink>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
        >
          <icons.Refresh strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="text-xl">Refresh</span>
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
        >
          <icons.Delete strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="text-xl">Delete</span>
        </Button>
      </div>
    </div>
  )
}
