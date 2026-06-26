import {
	BenefitsSection,
	CTASection,
	FaqSection,
	FeaturesSection,
	Hero,
	PricingSection,
	TestimonialsSection,
} from "@/components/sections";

export default function Home() {
	return (
		<>
			<Hero
				badge="V2.0 is now live"
				title="The new standard for modern software."
				description="Build, ship, and scale with the most intuitive platform designed for elite
       engineering teams. Move faster without breaking things."
				image="/hero.png"
				primaryAction={{
					label: "Get Started",
					href: "/signup",
				}}
				secondaryAction={{
					label: "Read Docs",
					href: "/docs",
				}}
			/>
			<FeaturesSection />
			<BenefitsSection />
			<TestimonialsSection />
			<PricingSection />
			<FaqSection />
			<CTASection />
		</>
	);
}
