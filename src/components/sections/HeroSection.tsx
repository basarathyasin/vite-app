

import { Button } from "@/components/ui/button";

interface HeroProps {
	badge?: string;
	title: string;
	description: string;
	image: string;

	primaryAction?: {
		label: string;
		href: string;
	};

	secondaryAction?: {
		label: string;
		href: string;
	};
}

export default function Hero({
	badge = "NOW AVAILABLE",
	title,
	description,
	image,
	primaryAction,
	secondaryAction,
}: HeroProps) {
	return (
		<section className="flex flex-col items-center py-8 md:px-8 md:py-10">
			<div className="mb-6">
				<div className="inline-flex items-center gap-2 rounded-full bg-[#E7E8E9] px-3 py-1">
					<div className="size-2 rounded-full bg-black" />

					<span className="font-heading text-xs font-semibold tracking-[0.05em] text-[#4C4546]">
						{badge}
					</span>
				</div>
			</div>

			<div className="w-full max-w-[1184px]">
				<h1 className="whitespace-nowrap text-center font-heading text-[19px] font-bold leading-[28px] text-black sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px] lg:text-[48px] lg:leading-[56px]">
					{title}
				</h1>
			</div>

			<div className="mt-4 max-w-[672px]">
				<p className="text-center font-light text-[16px] leading-7 text-[#585F6C]">
					{description}
				</p>
			</div>

			{(primaryAction || secondaryAction) && (
				<div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row md:mt-12">
					{primaryAction && (
						<Button asChild size="default">
							<a href={primaryAction.href}>{primaryAction.label}</a>
						</Button>
					)}

					{secondaryAction && (
						<Button asChild variant="outline">
							<a href={secondaryAction.href}>{secondaryAction.label}</a>
						</Button>
					)}
				</div>
			)}

			<div className="relative mt-12 flex w-full max-w-[1184px] flex-col md:mt-20">
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/5 to-transparent blur-xl" />

				<div className="relative overflow-hidden rounded-2xl border border-[#CFC4C580] bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]">
					<img
						src={image}
						alt={title}
						width={1184}
						height={676}
						className="aspect-[1184/676] h-auto w-full rounded-xl object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
