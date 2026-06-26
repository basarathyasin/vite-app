/* eslint-disable react-refresh/only-export-components */
import CompletedPage from "@/pages/dashboard/CompletedPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/completed")({
  component: CompletedRoutePage,
})

function CompletedRoutePage() {
  return <CompletedPage />
}
