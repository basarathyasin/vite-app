
import { Button } from "@/components/ui/button";

export default function CTASection() {
	return (
		<section id="contact" className="scroll-mt-24 px-6 py-20 md:px-12">
			<div className="mx-auto max-w-[1184px]">
				<div className="rounded-2xl border border-[#CFC4C580] bg-[#F3F4F5] px-5 py-16 md:px-12 md:py-24">
					<div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
						<h4 className="font-heading text-[36px] font-bold leading-[42px] tracking-[-1.44px] text-[#191C1D] md:text-[48px] md:leading-[56px]">
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
								className="h-[54px] w-full rounded-xl px-8 font-heading text-sm font-medium sm:min-w-[220px]"
							>
								<a href="/signup">Create Free Account</a>
							</Button>

							<Button
								asChild
								size="lg"
								variant="outline"
								className="h-[54px] w-full rounded-xl border-[#CFC4C5] bg-white px-8 font-heading text-sm font-medium sm:min-w-[180px]"
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
