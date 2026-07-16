import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTodo } from "@/lib/services/deleteTodo";
import { todosKeys } from "@/lib/queryKeys";

export function useDeleteTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: todosKeys.all });
		},
	});
}
