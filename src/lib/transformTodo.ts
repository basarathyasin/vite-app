import type { TodoItem } from "@/components/platform/TodoTable";

export interface TodoApiResponse {
	userId?: number;
	id?: number | string;
	documentId?: string;
	title?: string;
	task?: string;
	completed?: boolean;
	checkbox?: boolean;
	priority?: string;
	date?: string | number | null;
	dueDate?: string | null;
	due?: string | number | null;
	stats?: string | null;
}

export function transformTodo(apiTodo: TodoApiResponse): TodoItem {
	return {
		id: String(apiTodo.documentId ?? apiTodo.id),
		title: apiTodo.title ?? apiTodo.task ?? "Untitled task",
		status: normalizeStatus(apiTodo),
		priority: normalizePriority(apiTodo.priority),
		dueDate: normalizeDate(apiTodo.due ?? apiTodo.dueDate ?? apiTodo.date),
	};
}

function normalizePriority(priority: TodoApiResponse["priority"]): TodoItem["priority"] {
	const normalized = priority?.toLowerCase();

	return normalized === "low" || normalized === "high" ? normalized : "medium";
}

function normalizeStatus(todo: TodoApiResponse): TodoItem["status"] {
	if (todo.checkbox || todo.completed) return "done";

	return todo.stats?.toLowerCase() === "done" ? "done" : "todo";
}

function normalizeDate(date: TodoApiResponse["date"]): string | undefined {
	if (!date) return undefined;

	if (typeof date === "string") return date;

	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime())
		? undefined
		: parsed.toISOString().slice(0, 10);
}
