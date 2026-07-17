import { useQuery } from "@tanstack/react-query";

import { fetchTodos } from "@/lib/services/fetchTodo";
import { todosKeys } from "@/lib/queryKeys";
import { transformTodo } from "@/lib/transformTodo";

export function useTodos() {
	return useQuery({
		queryKey: todosKeys.all,
		queryFn: async () => {
			const todos = await fetchTodos();

			return todos.map(transformTodo);
		},
	});
}
