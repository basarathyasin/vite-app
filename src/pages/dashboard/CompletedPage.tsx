import { TodoTable } from "@/components/platform/TodoTable"

export default function CompletedPage() {
  return (
    <TodoTable
      statusFilter={["done"]}
      copy={{
        title: "Completed",
        subtitle: "Review the tasks you have already finished.",
        emptyTitle: "No completed tasks",
        emptyDescription: "Completed tasks will show up here.",
      }}
    />
  )
}
