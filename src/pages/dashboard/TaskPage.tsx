import { TodoTable } from "@/components/platform/TodoTable"

export default function TaskPage() {
  return (
    <TodoTable
      statusFilter={["todo", "in-progress"]}
      copy={{
        title: "Task",
        subtitle: "Create, update, complete, and remove active to-dos.",
        emptyTitle: "No active tasks",
        emptyDescription: "Add a task or reopen a completed one.",
      }}
    />
  )
}
