import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const GRAPHQL_API_URL =
	import.meta.env.VITE_GRAPHQL_API_URL ?? "/graphql";

export const apolloClient = new ApolloClient({
	link: new HttpLink({ uri: GRAPHQL_API_URL }),
	cache: new InMemoryCache(),
});
