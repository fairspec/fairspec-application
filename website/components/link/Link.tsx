import { Link as TanstackLink } from "@tanstack/react-router"
import { Badge } from "#blocks/badge.tsx"
import { Button } from "#blocks/button.tsx"
import { Card, CardContent, CardTitle } from "#blocks/card.tsx"
import * as icons from "#icons.ts"

export function Link(props: {
  title: string
  readingTime: string
  tags: string[]
}) {
  const { title, readingTime, tags } = props

  return (
    <Card className="group transition-all cursor-pointer hover:bg-accent/50 hover:shadow-md">
      <CardContent className="flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <CardTitle className="text-xl flex items-center gap-2">
            <icons.Star
              strokeWidth={1}
              className="size-5 cursor-pointer hover:fill-yellow-400 hover:text-yellow-400 transition-colors"
            />
            <TanstackLink to="/links/slug" className="hover:underline">
              {title}
            </TanstackLink>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">{readingTime}</span>
            <div className="flex gap-1 flex-wrap">
              {tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="default"
          className="h-full rounded-xl cursor-pointer self-stretch hidden group-hover:block"
        >
          <icons.ExternalLink strokeWidth={1} className="size-8" />
        </Button>
      </CardContent>
    </Card>
  )
}
