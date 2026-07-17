import { createContext } from "react";

export type AuthUser = {
	id?: number;
	name: string;
	email: string;
	role?: string;
};

export type AuthSession = {
	user: AuthUser;
	jwt: string;
};

export type AuthContextType = {
	currentUser: AuthUser | null;
	jwt: string | null;
	isAuthenticated: boolean;
	login: (session: AuthSession) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
