import { gql } from "@apollo/client";

import type { TodoTaskFormValues } from "@/components/platform/TodoTaskForm";
import { apolloClient } from "@/lib/apolloClient";
import type { TodoApiResponse } from "@/lib/transformTodo";

const CREATE_TODO = gql`
	mutation CreateTodo($data: TodoInput!) {
		createTodo(data: $data) {
			documentId
			title
			priority
			due
			checkbox
			stats
		}
	}
`;

type CreateTodoResponse = {
	createTodo: TodoApiResponse;
};

export async function createTodo(
	values: TodoTaskFormValues,
): Promise<TodoApiResponse> {
	const { data } = await apolloClient.mutate<CreateTodoResponse>({
		mutation: CREATE_TODO,
		variables: {
			data: {
				title: values.title,
				priority: values.priority,
				due: values.dueDate,
				checkbox: false,
				stats: "todo",
			},
		},
	});

	if (!data?.createTodo) {
		throw new Error("Unable to create todo.");
	}

	return data.createTodo;
}
