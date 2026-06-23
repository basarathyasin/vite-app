/* eslint-disable react-refresh/only-export-components */
import Home from '@/App'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <Home />
    </div>
  )
}
