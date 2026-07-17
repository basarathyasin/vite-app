import { TodoTable } from "@/components/platform/TodoTable";
import ErrorState from "@/components/ui/ui-states/Error";
import LoadingState from "@/components/ui/ui-states/Loading";
import { useDeleteTodo } from "@/hooks/mutations/useDeleteTodo";
import { useTodos } from "@/hooks/queries/useTodos";

export default function CompletedPage() {
	const { data: todos, isPending, error, refetch } = useTodos();
	const deleteMutation = useDeleteTodo();
	const completedTodos = (todos ?? []).filter((todo) => todo.status === "done");

	if (isPending) return <LoadingState />;
	if (error) {
		return <ErrorState message={error.message} retry={() => void refetch()} />;
	}

	return (
		<TodoTable
			todos={completedTodos}
			deletingIds={
				deleteMutation.isPending && deleteMutation.variables
					? [String(deleteMutation.variables)]
					: []
			}
			onDelete={deleteMutation.mutate}
			copy={{
				title: "Completed",
				subtitle: "Review the tasks you have already finished.",
				emptyTitle: "No completed tasks",
				emptyDescription: "Completed tasks will show up here.",
			}}
		/>
	);
}
