import type { TodoTaskFormValues } from "@/components/platform/TodoTaskForm";
import type { TodoApiResponse } from "@/lib/transformTodo";

const TODOS_API_URL =
	import.meta.env.VITE_TODOS_API_URL ??
	"https://jsonplaceholder.typicode.com/todos";

export async function createTodo(
	values: TodoTaskFormValues,
): Promise<TodoApiResponse> {
	const response = await fetch(TODOS_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: values.title,
			task: values.title,
			completed: false,
			priority: values.priority,
			date: values.dueDate,
		}),
	});

	if (!response.ok) {
		throw new Error("Unable to create todo.");
	}

	return response.json();
}
