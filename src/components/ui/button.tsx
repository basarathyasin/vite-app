/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	[
		"group/button inline-flex items-center justify-center",
		"font-heading font-medium",
		"whitespace-nowrap transition-all",
		"outline-none select-none",
		"disabled:pointer-events-none disabled:opacity-50",
		"focus-visible:ring-2 focus-visible:ring-ring/50",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
	].join(" "),
	{
		variants: {
			variant: {
				default:
					"bg-black text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)] hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-zinc-200",

				secondary:
					"border border-[#CFC4C5] bg-[#F8F9FA] text-[#191C1D] hover:bg-zinc-100 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",

				outline:
					"border border-[#CFC4C5] bg-transparent text-[#191C1D] hover:bg-zinc-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10",

				ghost:
					"bg-transparent text-[#191C1D] hover:bg-zinc-100 dark:text-white dark:hover:bg-white/10",

				destructive: "bg-red-600 text-white hover:bg-red-700",

				link: "text-black underline-offset-4 hover:underline bg-transparent p-0 h-auto rounded-none dark:text-white",
			},

			size: {
				xs: "h-8 px-3 rounded-lg text-xs",

				sm: "h-10 px-6 rounded-lg text-sm",

				default: "h-[46px] px-8 rounded-xl text-sm",

				lg: "h-[54px] px-10 rounded-xl text-sm",

				icon: "size-10 rounded-xl",

				"icon-xs": "size-8 rounded-lg",

				"icon-sm": "size-9 rounded-lg",

				"icon-lg": "size-12 rounded-xl",
			},

			width: {
				auto: "w-auto",
				full: "w-full",
			},
		},

		defaultVariants: {
			variant: "default",
			size: "default",
			width: "auto",
		},
	},
);

function Button({
	className,
	variant,
	size,
	width,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(
				buttonVariants({
					variant,
					size,
					width,
				}),
				className,
			)}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
