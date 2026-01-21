import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/validate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/table/validate"!</div>
}
