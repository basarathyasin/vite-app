/* eslint-disable react-refresh/only-export-components */
import Contact from '@/pages/Contact'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Contact />
  </div>
}
