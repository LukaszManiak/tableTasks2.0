import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tasks/$taskId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tasks/$taskId/edit"!</div>
}
