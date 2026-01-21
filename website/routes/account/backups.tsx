import { createFileRoute } from "@tanstack/react-router"
import { Card, CardContent } from "#blocks/card.tsx"
import { Header } from "./-shared/Header.tsx"

export const Route = createFileRoute("/account/backups")({
  component: Component,
})

function Component() {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Card>
        <CardContent>backups</CardContent>
      </Card>
    </div>
  )
}
