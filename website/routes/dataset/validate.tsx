import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dataset/validate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dataset/validate"!</div>
}
