import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserInitial } from "@/components/ui/user-initial";
import { cn } from "@/lib/utils";

export type DashboardNavbarClassNames = {
	root?: string;
	titleWrap?: string;
	title?: string;
	subtitle?: string;
};

export type DashboardNavbarProps = {
	title?: string;
	subtitle?: string;
	classNames?: DashboardNavbarClassNames;
};

export function DashboardNavbar({
	title = "Dashboard",
	subtitle = "Plan today, finish what matters.",
	classNames,
}: DashboardNavbarProps) {
	return (
		<header
			className={cn(
				"flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border bg-background px-4 md:px-6",
				classNames?.root,
			)}
		>
			<div className="flex min-w-0 items-center gap-3">
				<SidebarTrigger />

				<div className={cn("min-w-0", classNames?.titleWrap)}>
					<h1
						className={cn(
							"truncate font-heading text-base font-semibold text-[#191C1D] dark:text-white",
							classNames?.title,
						)}
					>
						{title}
					</h1>

					{subtitle && (
						<p
							className={cn(
								"hidden text-sm text-muted-foreground sm:block",
								classNames?.subtitle,
							)}
						>
							{subtitle}
						</p>
					)}
				</div>
			</div>

			<div className="flex items-center gap-2">
				<ThemeToggle />
				<UserInitial />
			</div>
		</header>
	);
}
