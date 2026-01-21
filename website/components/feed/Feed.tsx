import { Link as TanstackLink } from "@tanstack/react-router"
import { Badge } from "#blocks/badge.tsx"
import { Card, CardContent, CardTitle } from "#blocks/card.tsx"
import { cn } from "#helpers/style.ts"
import * as icons from "#icons.ts"

export function Feed(props: {
  title: string
  linkCount: number
  tags: string[]
  selected?: boolean
}) {
  const { title, linkCount, tags, selected = false } = props

  return (
    <Card
      className={cn(
        "group transition-all cursor-pointer",
        selected
          ? "bg-green-50 dark:bg-green-950/30 shadow-md border-green-500"
          : "hover:bg-accent/50 hover:shadow-md",
      )}
    >
      <CardContent className="flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <CardTitle className="text-xl flex items-center gap-2">
            <icons.Success strokeWidth={1} className="size-5 cursor-pointer" />
            {selected ? (
              title
            ) : (
              <TanstackLink to="/feeds/slug" className="hover:underline">
                {title}
              </TanstackLink>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              {linkCount} links total
            </span>
            <div className="flex gap-1 flex-wrap">
              {tags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(selected && "border-green-300")}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
