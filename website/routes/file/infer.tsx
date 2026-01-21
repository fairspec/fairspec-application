import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/file/infer")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/file/infer"!</div>
}
