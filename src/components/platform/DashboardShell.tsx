import { useMemo, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

import { DashboardNavbar, type DashboardNavbarProps } from "./DashboardNavbar";
import {
	DashboardSidebar,
	type DashboardSidebarProps,
} from "./DashboardSidebar";
import {
	dashboardNavItems,
	type DashboardNavItem,
} from "@/components/platform/dashboard-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type DashboardShellClassNames = {
	provider?: string;
	inset?: string;
	content?: string;
};

export type DashboardShellProps = {
	children?: ReactNode;
	navItems?: DashboardNavItem[];
	sidebar?: Omit<DashboardSidebarProps, "items">;
	navbar?: Omit<DashboardNavbarProps, "title">;
	classNames?: DashboardShellClassNames;
};

export function DashboardShell({
	children,
	navItems = dashboardNavItems,
	sidebar,
	navbar,
	classNames,
}: DashboardShellProps) {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const activeItem = useMemo(
		() =>
			navItems.find((item) =>
				item.href === "/dashboard"
					? pathname === item.href
					: pathname === item.href || pathname.startsWith(`${item.href}/`),
			) ?? navItems[0],
		[navItems, pathname],
	);

	return (
		<TooltipProvider>
			<SidebarProvider className={classNames?.provider}>
				<DashboardSidebar {...sidebar} items={navItems} />

				<SidebarInset className={classNames?.inset}>
					<DashboardNavbar
						{...navbar}
						title={activeItem?.label ?? "Dashboard"}
					/>

					<div className={cn("p-6", classNames?.content)}>{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}
