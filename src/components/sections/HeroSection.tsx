import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/Badge";

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
		<section className="flex flex-col items-center px-6 pb-20 pt-[96px] md:px-12 md:pb-20 md:pt-20">
			<Badge label={badge} />

			<div className="mt-6 w-full max-w-[896px]">
				<h1 className="text-center font-heading text-[34px] font-bold leading-[40px] text-black sm:text-[42px] sm:leading-[50px] lg:whitespace-nowrap lg:text-[48px] lg:leading-[56px]">
					{title}
				</h1>
			</div>

			<div className="mt-3 max-w-[672px] px-0 md:px-9">
				<p className="text-center text-[18px] leading-7 text-[#585F6C]">
					{description}
				</p>
			</div>

			{(primaryAction || secondaryAction) && (
				<div className="mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
					{primaryAction && (
						<Button asChild size="lg" className="px-10">
							<a href={primaryAction.href}>{primaryAction.label}</a>
						</Button>
					)}

					{secondaryAction && (
						<Button asChild size="lg" variant="outline" className="bg-[#F8F9FA] px-10">
							<a href={secondaryAction.href}>{secondaryAction.label}</a>
						</Button>
					)}
				</div>
			)}

			<div className="relative mt-20 flex w-full max-w-[1184px] flex-col">
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/5 to-transparent blur-xl" />

				<div className="relative overflow-hidden rounded-2xl border border-[#CFC4C580] bg-white p-[17px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]">
					<img
						src={image}
						alt={title}
						width={1184}
						height={676}
						className="aspect-[1151/642] h-auto w-full rounded-xl object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
