import type { ReactNode } from "react";
import { Card } from "./Card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="min-h-[230px] p-[33px]">
      <div className="text-black">
        {icon}
      </div>

      <h3 className="mt-6 font-heading text-[24px] font-semibold leading-8 tracking-[-0.48px] text-[#191C1D]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-5 text-[#585F6C]">
        {description}
      </p>
    </Card>
  );
}
