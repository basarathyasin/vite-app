const TODOS_API_URL =
	import.meta.env.VITE_TODOS_API_URL ??
	"https://jsonplaceholder.typicode.com/todos";

export async function deleteTodo(id: string | number) {
	const response = await fetch(`${TODOS_API_URL}/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Unable to delete todo.");
	}

	return response.text();
}
