import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dataset/infer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dataset/infer"!</div>
}
