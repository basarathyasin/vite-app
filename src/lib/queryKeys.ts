export const todosKeys = {
	all: ["todos"] as const,
	detail: (id: string | number) => ["todos", id] as const,
};
