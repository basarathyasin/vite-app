import { Activity, Bot, Code2, Globe, Shield, Users } from "lucide-react";
import { FeatureCard } from "@/components/ui/card/FeatureCard";

const features = [
  {
    icon: Bot,
    title: "AI Orchestration",
    description:
      "Automated resource allocation and predictive scaling powered by our proprietary ML models.",
  },
  {
    icon: Shield,
    title: "Military-Grade Security",
    description:
      "Zero-trust architecture by default with automated compliance auditing for SOC2 and HIPAA.",
  },
  {
    icon: Globe,
    title: "Edge Optimization",
    description:
      "Deploy to over 300 global edge locations instantly with sub-50ms latency globally.",
  },
  {
    icon: Code2,
    title: "Developer SDKs",
    description:
      "Native support for TypeScript, Rust, and Go with auto-generated documentation.",
  },
  {
    icon: Activity,
    title: "Live Observability",
    description:
      "Real-time tracing and telemetry integrated directly into your existing dashboard.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Granular RBAC controls and shared workspaces for seamless engineering workflows.",
  },
];



export default function FeaturesSection() {

  return (
    <section id="features" className="scroll-mt-24 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-[1184px]">
        <div className="max-w-[672px]">
          <h2 className="font-heading text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-black">
            Engineered for velocity.
          </h2>

          <p className="mt-4 text-base leading-6 text-[#585F6C]">
            Everything you need to manage complex infrastructure at any scale,
            without the configuration headache.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={<feature.icon className="size-6 stroke-[2.3]" />}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
