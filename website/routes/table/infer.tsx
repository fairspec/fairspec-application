import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/infer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/table/infer"!</div>
}
