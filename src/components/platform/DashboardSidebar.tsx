import { Link, useRouterState } from "@tanstack/react-router";

import {
	dashboardNavItems,
	type DashboardNavItem,
} from "@/components/platform/dashboard-nav";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export type DashboardSidebarClassNames = {
	root?: string;
	header?: string;
	brand?: string;
	groupLabel?: string;
	menu?: string;
	menuButton?: string;
	menuButtonActive?: string;
	footer?: string;
};

export type DashboardSidebarProps = {
	brand?: string;
	items?: DashboardNavItem[];
	groupLabel?: string;
	footerLabel?: string;
	classNames?: DashboardSidebarClassNames;
};

export function DashboardSidebar({
	brand = "VITE",
	items = dashboardNavItems,
	groupLabel = "Todo",
	footerLabel = "Todo workspace",
	classNames,
}: DashboardSidebarProps) {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const { isMobile, setOpenMobile } = useSidebar();

	const isActive = (href: string) =>
		href === "/dashboard"
			? pathname === href
			: pathname === href || pathname.startsWith(`${href}/`);

	const closeMobileSidebar = () => {
		if (isMobile) {
			setOpenMobile(false);
		}
	};

	return (
		<Sidebar className={classNames?.root}>
			<SidebarHeader className={cn("p-4", classNames?.header)}>
				<Link
					to="/dashboard"
					className={cn(
						"font-heading text-lg font-semibold",
						classNames?.brand,
					)}
					onClick={closeMobileSidebar}
				>
					{brand}
				</Link>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className={classNames?.groupLabel}>
						{groupLabel}
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu className={cn("gap-2", classNames?.menu)}>
							{items.map((item) => {
								const active = isActive(item.href);

								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton
											asChild
											isActive={active}
											tooltip={item.label}
											className={cn(
												"h-10 rounded-lg px-3 font-medium transition-colors hover:bg-[#E6F4FF] hover:text-[#075985]",
												classNames?.menuButton,
												active &&
													cn(
														"bg-[#DBEAFE] text-[#075985] shadow-[inset_3px_0_0_#0284C7]",
														classNames?.menuButtonActive,
													),
											)}
										>
											<Link to={item.href} onClick={closeMobileSidebar}>
												<item.icon className="size-4" />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{footerLabel && (
				<SidebarFooter
					className={cn(
						"p-4 text-sm text-muted-foreground",
						classNames?.footer,
					)}
				>
					{footerLabel}
				</SidebarFooter>
			)}
		</Sidebar>
	);
}
