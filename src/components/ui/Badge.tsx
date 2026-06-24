import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#E7E8E9] px-3 py-1",
        className
      )}
    >
      <div className="h-2 w-2 rounded-full bg-black" />

      <span className="font-heading text-xs font-semibold leading-4 tracking-[0.6px] text-[#4C4546]">
        {label}
      </span>
    </div>
  );
}
