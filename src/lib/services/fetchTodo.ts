import { gql } from "@apollo/client";

import { apolloClient } from "@/lib/apolloClient";
import type { TodoApiResponse } from "@/lib/transformTodo";

const GET_TODOS = gql`
	query Todos {
		todos {
			documentId
			title
			priority
			due
			checkbox
			stats
		}
	}
`;

type TodosResponse = {
	todos: TodoApiResponse[];
};

export async function fetchTodos(): Promise<TodoApiResponse[]> {
	const { data } = await apolloClient.query<TodosResponse>({
		query: GET_TODOS,
		fetchPolicy: "network-only",
	});

	return data?.todos ?? [];
}
