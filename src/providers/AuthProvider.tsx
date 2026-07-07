import { useState, type ReactNode } from "react";

import { AuthContext, type AuthUser } from "@/context/AuthContext";

const CURRENT_USER_STORAGE_KEY = "currentUser";
const IS_AUTHENTICATED_STORAGE_KEY = "isAuthenticated";
const USERS_STORAGE_KEY = "users";

type AuthProviderProps = {
	children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
	const [currentUser, setCurrentUser] = useState<AuthUser | null>(() =>
		getStoredUser(),
	);

	function login(user: AuthUser) {
		setCurrentUser(user);
		localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
		localStorage.setItem(IS_AUTHENTICATED_STORAGE_KEY, "true");
	}

	function logout() {
		setCurrentUser(null);
		localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
		localStorage.removeItem(IS_AUTHENTICATED_STORAGE_KEY);
	}

	const isAuthenticated = currentUser !== null;

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				isAuthenticated,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function getStoredUser(): AuthUser | null {
	if (typeof window === "undefined") {
		return null;
	}

	const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

	if (storedUser) {
		const parsedUser = parseAuthUser(storedUser);

		if (parsedUser) {
			return parsedUser;
		}
	}

	if (localStorage.getItem(IS_AUTHENTICATED_STORAGE_KEY) !== "true") {
		return null;
	}

	const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

	if (!storedUsers) {
		return null;
	}

	return parseAuthUser(storedUsers);
}

function parseAuthUser(value: string): AuthUser | null {
	try {
		const parsed = JSON.parse(value) as Partial<AuthUser> | Partial<AuthUser>[];
		const user = Array.isArray(parsed) ? parsed.at(-1) : parsed;

		if (typeof user?.name === "string" && typeof user.email === "string") {
			return {
				name: user.name,
				email: user.email,
			};
		}
	} catch {
		return null;
	}

	return null;
}
