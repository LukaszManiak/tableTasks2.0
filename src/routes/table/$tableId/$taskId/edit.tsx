import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/table/$tableId/$taskId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/table/$tableId/$taskId/edit"!</div>
}
