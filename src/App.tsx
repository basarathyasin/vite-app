import BenefitsSection from "@/components/sections/BenefitSection";
import CTASection from "@/components/sections/CTASection";
import FaqSection from "@/components/sections/FaqSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Hero from "@/components/sections/HeroSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

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
					href: "/products",
				}}
				secondaryAction={{
					label: "Read Doc",
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