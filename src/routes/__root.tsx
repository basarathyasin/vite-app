/* eslint-disable react-refresh/only-export-components */
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { createRootRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Footer from "@/layout/Footer";
import NotFound from "@/pages/NotFound";

const links = [
	{ href: "/#features", label: "Features" },
	{ href: "/#pricing", label: "Pricing" },
	{ href: "/#about", label: "About" },
	{ href: "/#contact", label: "Contact" },
];

export const Route = createRootRoute({
	component: RootLayout,
	notFoundComponent: NotFound,
});

function RootLayout() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => setIsOpen(false);
	const isAuthRoute = pathname === "/login" || pathname === "/signup";
	const isDashboardRoute =
		pathname === "/dashboard" || pathname.startsWith("/dashboard/");
	const hideNavbar = isAuthRoute || isDashboardRoute;

	return (
		<div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-[#08090A]">
			{!hideNavbar && (
				<header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#F8F9FA]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#08090A]/90">
					<div className="flex h-[72px] w-full items-center justify-between px-6 md:px-12">
						<div className="flex items-center gap-12">
							<Link
								to="/"
								className="font-heading text-xl font-black tracking-tight text-black dark:text-white"
								onClick={closeMenu}
							>
								VITE
							</Link>

							<nav className="hidden items-center gap-8 md:flex">
								{links.map((link) => (
									<a
										key={link.href}
										href={link.href}
										className="text-sm font-medium text-[#585F6C] transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
									>
										{link.label}
									</a>
								))}
							</nav>
						</div>

						<div className="hidden items-center gap-2 md:flex">
							<ThemeToggle />

							<Button asChild size="sm" variant="ghost" className="h-9 px-4">
								<a href="/login">Login</a>
							</Button>

							<Button asChild size="sm" variant="default" className="h-9 rounded-lg px-5">
								<a href="/signup">Get Started</a>
							</Button>
						</div>

						<div className="flex items-center gap-2 md:hidden">
							<ThemeToggle />

							<Button
								aria-controls="mobile-navigation"
								aria-expanded={isOpen}
								aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
								onClick={() => setIsOpen((current) => !current)}
								size="icon-sm"
								type="button"
								variant="ghost"
							>
								{isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
							</Button>
						</div>
					</div>

					{isOpen && (
						<div
							id="mobile-navigation"
							className="border-t border-black/10 bg-zinc-50 px-6 py-5 shadow-sm dark:border-white/10 dark:bg-[#0F1113] md:hidden"
						>
							<nav className="flex flex-col gap-1">
								{links.map((link) => (
									<a
										key={link.href}
										href={link.href}
										className="rounded-lg px-2 py-3 text-base font-light text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
										onClick={closeMenu}
									>
										{link.label}
									</a>
								))}
							</nav>

							<div className="mt-5 grid gap-3">
								<ThemeToggle showLabel width="full" />

								<Button asChild size="sm" variant="ghost" width="full">
									<a href="/login" onClick={closeMenu}>
										Login
									</a>
								</Button>

								<Button asChild size="sm" variant="default" width="full">
									<a href="/signup" onClick={closeMenu}>
										Get Started
									</a>
								</Button>
							</div>
						</div>
					)}
				</header>
			)}
			{isAuthRoute ? (
				<main className="flex w-full flex-1 items-center justify-center px-4 py-6">
					<Outlet />
				</main>
			) : (
				<Outlet />
			)}
			{!isDashboardRoute && <Footer />}
		</div>
	);
}
