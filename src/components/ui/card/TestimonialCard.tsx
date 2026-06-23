import { Card } from "@/components/ui/card/Card";


interface TestimonialCardProps {
	quote: string;
	name: string;
	role: string;
	avatar?: string;
}

export function TestimonialCard({
	quote,
	name,
	role,
	avatar,
}: TestimonialCardProps) {
	return (
		<Card className="flex h-full flex-col justify-between p-10">
			<p className="text-[24px] font-600  leading-8 tracking-tight p-5 justify-start">
				&quot; {quote} &quot;
			</p>

			<div className="flex items-center gap-4">
				<div className="size-12 font-heading  rounded-full bg-zinc-200 overflow-hidden">
					{avatar && (
						<img
							src={avatar}
							alt={name}
							width={100}
							height={100}
							className="h-full w-full object-cover"
						/>
					)}
				</div>

				<div>
					<div className="font-heading text-base">{name}</div>

					<div className="text-sm text-zinc-600">{role}</div>
				</div>
			</div>
		</Card>
	);
}