import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/$tableId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/table/$tableId/edit"!</div>
}
