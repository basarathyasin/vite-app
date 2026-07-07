import { createContext } from "react";

export type AuthUser = {
	name: string;
	email: string;
};

export type AuthContextType = {
	currentUser: AuthUser | null;
	isAuthenticated: boolean;
	login: (user: AuthUser) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
