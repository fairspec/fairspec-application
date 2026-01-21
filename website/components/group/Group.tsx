import { Link as TanstackLink } from "@tanstack/react-router"
import { Badge } from "#blocks/badge.tsx"
import { Card, CardContent, CardTitle } from "#blocks/card.tsx"
import { cn } from "#helpers/style.ts"

export function Group(props: {
  title: string
  linkCount: number
  tags?: string[]
  selected?: boolean
}) {
  const { title, linkCount, tags, selected = false } = props

  return (
    <Card
      className={cn(
        "group transition-all cursor-pointer",
        selected
          ? "bg-yellow-50 dark:bg-yellow-950/30 shadow-md border-yellow-500"
          : "hover:bg-accent/50 hover:shadow-md",
      )}
    >
      <CardContent className="flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <CardTitle className="text-xl">
            {selected ? (
              title
            ) : (
              <TanstackLink to="/groups/slug" className="hover:underline">
                {title}
              </TanstackLink>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm pb-1">
              {linkCount} links total
            </span>
            <div className="flex gap-1 flex-wrap">
              {tags?.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={cn(selected && "border-blue-300")}
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
