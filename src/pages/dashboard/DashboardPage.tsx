import { TodoTable } from "@/components/platform/TodoTable"

export default function DashboardPage() {
  return (
    <TodoTable
      copy={{
        title: "Dashboard",
        subtitle: "Plan today, finish what matters.",
        emptyTitle: "No tasks yet",
        emptyDescription: "Add your first task to start planning your day.",
      }}
    />
  )
}
