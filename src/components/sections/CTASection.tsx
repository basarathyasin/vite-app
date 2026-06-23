
import { Button } from "@/components/ui/button";

export default function CTASection() {
	return (
		<section id="contact" className="scroll-mt-24 py-16 md:px-8 md:py-20">
			<div className="mx-auto max-w-[1280px]">
				<div className="rounded-2xl border border-[#CFC4C580] bg-[#F3F4F5] px-5 py-16 md:rounded-[32px] md:px-12 md:py-32">
					<div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
						<h4 className="font-heading text-[36px] font-[700] leading-[42px] text-[#191C1D] md:text-[48px] md:leading-[56px]">
							Start building today.
						</h4>

						<p className="mt-6 max-w-[760px] text-lg leading-8 text-[#585F6C]">
							Join over 10,000 developers building the future on Premium
							infrastructure.
						</p>

						<div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row md:mt-12">
							<Button
								asChild
								size="lg"
								className="h-14 w-full rounded-2xl px-8 font-heading text-base font-medium sm:min-w-[240px]"
							>
								<a href="/signup">Create Free Account</a>
							</Button>

							<Button
								asChild
								size="lg"
								variant="outline"
								className="h-14 w-full rounded-2xl border-[#CFC4C5] bg-white px-8 font-heading text-base font-medium sm:min-w-[240px]"
							>
								<a href="/sales">Talk to Sales</a>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
