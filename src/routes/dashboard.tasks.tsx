/* eslint-disable react-refresh/only-export-components */
import TaskPage from "@/pages/dashboard/TaskPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/tasks")({
  component: TasksRoutePage,
})

function TasksRoutePage() {
  return <TaskPage />
}
