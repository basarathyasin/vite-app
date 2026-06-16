import About from '@/pages/About'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: about,
})

function about() {
  return <div>
    <About />
  </div>
}
