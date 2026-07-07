import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
	className?: string;
	showLabel?: boolean;
	width?: "auto" | "full";
};

export function ThemeToggle({
	className,
	showLabel = false,
	width = "auto",
}: ThemeToggleProps) {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";
	const label = isDark ? "Switch to light theme" : "Switch to dark theme";

	return (
		<Button
			aria-label={label}
			aria-pressed={isDark}
			className={cn(
				showLabel ? "gap-2" : "size-9",
				"dark:text-white dark:hover:bg-white/10",
				className,
			)}
			onClick={toggleTheme}
			size={showLabel ? "sm" : "icon-sm"}
			title={label}
			type="button"
			variant="ghost"
			width={width}
		>
			{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
			{showLabel && <span>{isDark ? "Dark" : "Light"}</span>}
		</Button>
	);
}
