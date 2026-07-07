import { PricingCard } from "@/components/ui/card/PricingCard";

const plans = [
	{
		name: "Starter",
		price: "$0",
		period: "/ forever",
		description: "Perfect for side projects and individual developers.",
		features: ["3 projects", "Basic analytics", "100GB bandwidth"],
		cta: "Get Started",
		variant: "default" as const,
	},
	{
		name: "Pro",
		badge: "MOST POPULAR",
		price: "$29",
		period: "/ mo",
		description: "For growing teams that need performance and scale.",
		features: [
			"Unlimited projects",
			"Advanced ML scaling",
			"1TB bandwidth",
		],
		cta: "Start 14-day Trial",
		variant: "featured" as const,
	},
	{
		name: "Enterprise",
		price: "Custom",
		description: "Dedicated infrastructure for mission-critical apps.",
		features: [
			"Custom SLAs",
			"Multi-region failover",
			"Dedicated Account Manager",
		],
		cta: "Contact Sales",
		variant: "default" as const,
	},
];

export default function PricingSection() {
	return (
		<section id="pricing" className="scroll-mt-24 px-6 pb-16 pt-40 md:px-12 md:pb-20">
			<div className="mx-auto max-w-[1184px]">
				<div className="mx-auto mb-12 max-w-xl text-center">
					<h2 className="font-heading text-[32px] font-[600] leading-[40px] tracking-[-0.64px] text-[#191C1D] dark:text-white">
						Scalable pricing for scaling teams.
					</h2>

					<p className="mt-4 text-base text-[#585F6C] dark:text-zinc-400">
						Start for free and pay as you grow. No hidden fees.
					</p>
				</div>

				<div className="grid items-stretch gap-4 lg:grid-cols-3">
					{plans.map((plan) => (
						<PricingCard
							key={plan.name}
							name={plan.name}
							badge={plan.badge}
							price={plan.price}
							period={plan.period}
							description={plan.description}
							features={plan.features}
							cta={plan.cta}
							variant={plan.variant}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
