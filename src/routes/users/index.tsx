import Users from '@/pages/Users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: users,
})

function users() {
  return <div>
    <Users/>
    </div>
}
