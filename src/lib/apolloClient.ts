import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { STRAPI_JWT_STORAGE_KEY } from "@/lib/auth/strapiAuth";

export const GRAPHQL_API_URL =
	import.meta.env.VITE_GRAPHQL_API_URL ?? "/graphql";

const httpLink = new HttpLink({
	uri: GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
	const token =
		typeof window === "undefined"
			? null
			: localStorage.getItem(STRAPI_JWT_STORAGE_KEY);

	return {
		headers: {
			...headers,
			"apollo-require-preflight": "true",
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
