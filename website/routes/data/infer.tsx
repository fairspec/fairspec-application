import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/data/infer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/data/infer"!</div>
}
