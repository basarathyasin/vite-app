import { useState, type ReactNode } from "react";

import { AuthContext, type AuthSession } from "@/context/AuthContext";
import {
	AUTH_USER_STORAGE_KEY,
	STRAPI_JWT_STORAGE_KEY,
	getStoredAuthSession,
} from "@/lib/auth/strapiAuth";

type AuthProviderProps = {
	children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
	const [session, setSession] = useState<AuthSession | null>(() =>
		getStoredAuthSession(),
	);

	function login(nextSession: AuthSession) {
		setSession(nextSession);
		localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(nextSession.user));
		localStorage.setItem(STRAPI_JWT_STORAGE_KEY, nextSession.jwt);
	}

	function logout() {
		setSession(null);
		localStorage.removeItem(AUTH_USER_STORAGE_KEY);
		localStorage.removeItem(STRAPI_JWT_STORAGE_KEY);
	}

	const currentUser = session?.user ?? null;
	const jwt = session?.jwt ?? null;
	const isAuthenticated = session !== null;

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				jwt,
				isAuthenticated,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
