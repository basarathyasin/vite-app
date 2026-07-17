import { TodoTable } from "@/components/platform/TodoTable";
import ErrorState from "@/components/ui/ui-states/Error";
import LoadingState from "@/components/ui/ui-states/Loading";
import { useCreateTodo } from "@/hooks/mutations/useCreateTodo";
import { useDeleteTodo } from "@/hooks/mutations/useDeleteTodo";
import { useTodos } from "@/hooks/queries/useTodos";

export default function TaskPage() {
	const { data: todos, isPending, error, refetch } = useTodos();
	const createMutation = useCreateTodo();
	const deleteMutation = useDeleteTodo();
	const activeTodos = (todos ?? []).filter((todo) => todo.status !== "done");

	if (isPending) return <LoadingState />;
	if (error) {
		return <ErrorState message={error.message} retry={() => void refetch()} />;
	}

	return (
		<TodoTable
			todos={activeTodos}
			isCreating={createMutation.isPending}
			deletingIds={
				deleteMutation.isPending && deleteMutation.variables
					? [String(deleteMutation.variables)]
					: []
			}
			onCreate={createMutation.mutate}
			onDelete={deleteMutation.mutate}
			copy={{
				title: "Task",
				subtitle: "Create, update, complete, and remove active to-dos.",
				emptyTitle: "No active tasks",
				emptyDescription: "Add a task or reopen a completed one.",
			}}
		/>
	);
}
