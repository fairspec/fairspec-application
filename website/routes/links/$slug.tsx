import { createFileRoute, Link } from "@tanstack/react-router"
import { Alert, AlertDescription, AlertTitle } from "#blocks/alert.tsx"
import { Badge } from "#blocks/badge.tsx"
import { Button } from "#blocks/button.tsx"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "#blocks/card.tsx"
import { Separator } from "#blocks/separator.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export const Route = createFileRoute("/links/$slug")({
  component: Component,
})

function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Body />
    </div>
  )
}

export function Header() {
  return (
    <div className="flex items-center gap-4 py-1 justify-between">
      <Link
        to="/links"
        className="text-md text-muted-foreground pl-2 hover:text-primary flex items-center gap-2"
      >
        <icons.Return
          strokeWidth={settings.ICON_STROKE_WIDTH}
          className="size-5"
        />
        Return to links
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
        >
          <icons.History strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="text-xl">Snooze</span>
        </Button>
        <Button
          variant="ghost"
          size="default"
          className="rounded-xl cursor-pointer"
        >
          <icons.Store strokeWidth={settings.ICON_STROKE_WIDTH} />
          <span className="text-xl">Archive</span>
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

function Body() {
  return (
    <Card className="gap-0 pt-0">
      <CardHeader className="group py-8 hover:bg-accent/50 transition-colors cursor-pointer">
        <CardTitle className="text-3xl flex items-center gap-2">
          <icons.Star
            strokeWidth={1}
            className="size-8 cursor-pointer hover:fill-yellow-400 hover:text-yellow-400 transition-colors"
          />
          <h1>Lorem Ipsum Dolor Sit Amet</h1>
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>5 min read</span>
          <div className="flex gap-1 flex-wrap">
            <Badge variant="outline">📝 lorem</Badge>
            <Badge variant="outline">📄 ipsum</Badge>
            <Badge variant="outline">💡 example</Badge>
          </div>
        </div>
        <CardAction>
          <Button
            variant="ghost"
            size="default"
            className="h-full rounded-xl cursor-pointer self-stretch hidden group-hover:block"
          >
            <icons.ExternalLink strokeWidth={1} className="size-8" />
          </Button>
        </CardAction>
      </CardHeader>
      <div className="flex flex-col gap-4">
        <Separator />
        <Alert className="border-0 px-6 py-0">
          <AlertTitle>
            <div className="flex gap-2 items-center text-lg font-bold">
              <icons.Book strokeWidth={settings.ICON_STROKE_WIDTH} size={20} />
              Description
            </div>
          </AlertTitle>
          <AlertDescription className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </AlertDescription>
        </Alert>
        <Separator />
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Introduction</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Key Concepts</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Conclusion</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
