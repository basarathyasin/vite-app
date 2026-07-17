import { TodoTable } from "@/components/platform/TodoTable";
import ErrorState from "@/components/ui/ui-states/Error";
import LoadingState from "@/components/ui/ui-states/Loading";
import { useCreateTodo } from "@/hooks/mutations/useCreateTodo";
import { useDeleteTodo } from "@/hooks/mutations/useDeleteTodo";
import { useTodos } from "@/hooks/queries/useTodos";

export default function DashboardPage() {
	const { data: todos, isPending, error, refetch } = useTodos();
	const createMutation = useCreateTodo();
	const deleteMutation = useDeleteTodo();

	const deletingIds =
		deleteMutation.isPending && deleteMutation.variables
			? [String(deleteMutation.variables)]
			: [];

	if (isPending) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState message={error.message} retry={() => void refetch()} />;
	}

	return (
		<TodoTable
			todos={todos ?? []}
			isCreating={createMutation.isPending}
			deletingIds={deletingIds}
			onCreate={createMutation.mutate}
			onDelete={deleteMutation.mutate}
		/>
	);
}
