import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function UserInitial() {
	const { currentUser, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	if (!currentUser) {
		return null;
	}

	const initial = (
		currentUser.name.trim().charAt(0) || currentUser.email.trim().charAt(0)
	).toUpperCase();

	function handleLogout() {
		logout();
		setIsOpen(false);
		window.location.replace("/login");
	}

	return (
		<div className="relative">
			<button
				aria-expanded={isOpen}
				aria-label={`${currentUser.name} profile`}
				className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black font-heading text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 dark:border-white/15 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus-visible:ring-white/30"
				onClick={() => setIsOpen((current) => !current)}
				title={currentUser.name}
				type="button"
			>
				{initial}
			</button>

			{isOpen && (
				<div className="absolute right-0 top-11 z-50 w-64 rounded-lg border border-black/10 bg-white p-3 text-left shadow-lg dark:border-white/10 dark:bg-[#101214]">
					<p className="truncate text-sm font-medium text-[#191C1D] dark:text-white">
						{currentUser.email}
					</p>

					<Button
						className="mt-3 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
						onClick={handleLogout}
						size="sm"
						type="button"
						variant="outline"
						width="full"
					>
						Logout
					</Button>
				</div>
			)}
		</div>
	);
}
