import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "./Card";
import { cn } from "@/lib/utils";

interface PricingCardProps {
	name: string;
	badge?: string;
	price: string;
	period?: string;
	description: string;
	features: string[];
	cta: string;
	variant?: "default" | "featured";
}

export function PricingCard({
	name,
	badge,
	price,
	period,
	description,
	features,
	cta,
	variant = "default",
}: PricingCardProps) {
	const featured = variant === "featured";

	return (
		<Card
			className={cn(
				"flex flex-col p-8 transition-colors",
				featured
					? "min-h-[560px] border-black bg-black text-white"
					: "min-h-[520px] bg-white text-[#191C1D]"
			)}
		>
			<div>
				{badge && (
					<div className="mb-6 inline-flex rounded-full bg-white/10 px-3 py-1">
						<span className="font-heading text-xs font-semibold uppercase tracking-[0.6px] text-white">
							{badge}
						</span>
					</div>
				)}

				<h4 className="font-heading text-xl font-[400] tracking-[-0.48px]">
					{name}
				</h4>

				<div className="mt-3 flex items-end gap-1">
					<span className="font-heading text-[48px] leading-none">
						{price}
					</span>

					{period && (
						<span
							className={cn(
								"text-base",
								featured ? "text-zinc-400" : "text-[#585F6C]"
							)}
						>
							{period}
						</span>
					)}
				</div>

				<p
					className={cn(
						"mt-6 text-base leading-8",
						featured ? "text-zinc-400" : "text-[#585F6C]"
					)}
				>
					{description}
				</p>
			</div>

			<ul className="mt-10 flex-1 space-y-5">
				{features.map((feature) => (
					<li
						key={feature}
						className="flex items-center gap-3 text-sm"
					>
						<Check className="size-4 shrink-0" />
						<span>{feature}</span>
					</li>
				))}
			</ul>

			<Button
				asChild
				variant={featured ? "secondary" : "outline"}
				className={cn(
					"mt-8 w-full",
					featured && "bg-white text-black hover:bg-zinc-100"
				)}
			>
				<a href="/pricing">{cta}</a>
			</Button>
		</Card>
	);
}
