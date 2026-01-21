import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/data/validate")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/data/validate"!</div>
}
