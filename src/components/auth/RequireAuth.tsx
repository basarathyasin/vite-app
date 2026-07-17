import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { useAuth } from "@/hooks/useAuth";

type RequireAuthProps = {
	children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
