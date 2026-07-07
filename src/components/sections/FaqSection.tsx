import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		question: "How does migration work?",
		answer:
			"Our migration team handles the entire process, ensuring a smooth transition with minimal downtime.",
	},
	{
		question: "Is there a limit on bandwidth?",
		answer:
			"Bandwidth depends on your plan. Enterprise customers can request custom limits.",
	},
	{
		question: "Can we self-host PREMIUM?",
		answer:
			"Yes. Enterprise plans support self-hosted deployments with dedicated infrastructure.",
	},
];

export default function FaqSection() {
	return (
		<section className="px-6 py-24 md:px-12 md:py-[160px]">
			<div className="mx-auto max-w-[1184px]">
				<h2 className="mb-12 text-center font-heading text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#191C1D] dark:text-white md:mb-20">
					Frequently Asked Questions
				</h2>

				<Accordion
					type="single"
					collapsible
					className="mx-auto flex max-w-[672px]"
				>
					{faqs.map((faq) => (
						<AccordionItem
							key={faq.question}
							value={faq.question}
							className="border-b border-[#E7E8E9] dark:border-white/10"
						>
							<AccordionTrigger className="py-6 text-left font-heading text-[18px] font-normal leading-5 text-[#191C1D] hover:no-underline dark:text-white">
								{faq.question}
							</AccordionTrigger>

							<AccordionContent className="pb-8 text-base leading-7 text-[#585F6C] dark:text-zinc-400 md:pr-12">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
