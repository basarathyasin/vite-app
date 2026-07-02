import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "@/hooks/useAuth";

export function AuthRedirect() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			void navigate({ to: "/dashboard", replace: true });
		}
	}, [currentUser, navigate]);

	return null;
}
