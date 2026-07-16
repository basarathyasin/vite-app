import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTodo } from "@/lib/services/createTodo";
import { todosKeys } from "@/lib/queryKeys";

export function useCreateTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: todosKeys.all });
		},
	});
}
