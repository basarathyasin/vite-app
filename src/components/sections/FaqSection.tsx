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
		<section className="py-24 md:px-8 md:py-[160px]">
			<div className="mx-auto max-w-[1184px]">
				<h2 className="mb-12 text-center font-heading text-[32px] font-[600] text-[#191C1D] md:mb-20 md:text-[34px]">
					Frequently Asked Questions
				</h2>

				<Accordion
					type="single"
					collapsible
					className="flex md:pl-40 md:pr-20"
				>
					{faqs.map((faq) => (
						<AccordionItem
							key={faq.question}
							value={faq.question}
							className="border-b border-[#CFC4C5]"
						>
							<AccordionTrigger className="py-6 text-left font-heading text-[20px] font-normal leading-7 text-[#191C1D] hover:no-underline md:py-10 md:text-[24px] md:leading-8">
								{faq.question}
							</AccordionTrigger>

							<AccordionContent className="pb-8 text-base leading-7 text-[#585F6C] md:pr-12">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}