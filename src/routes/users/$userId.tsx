/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
	component: UserDetail,

	loader: async ({ params }) => {
        console.log("Loader running...");
		await new Promise((resolve) =>
			setTimeout(resolve, 3000)
		);


		const id = Number(params.userId);

		if (Number.isNaN(id)) {
			throw new Error("Invalid User ID");
		}

		if (id > 500) {
			throw new Error("User Not Found");
		}

		return {
			userId: params.userId,
		};
	},

	pendingComponent: () => (
		<h1>Loading User...</h1>
	),

	errorComponent: ({ error }) => (
		<div>
			<h1>Error</h1>
			<p>{error.message}</p>
		</div>
	),
});

function UserDetail() {
	const { userId } = Route.useLoaderData();

	const apiUrl =
		import.meta.env.VITE_API_URL;
        console.log("Component rendering...");

	return (
		<div>
			<h1>User Details</h1>

			<p>
				<strong>User ID:</strong> {userId}
			</p>

			<p>
				<strong>API URL:</strong> {apiUrl}
			</p>
		</div>
	);
}