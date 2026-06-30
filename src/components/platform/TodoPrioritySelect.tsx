import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { TodoPriority } from "@/components/platform/TodoTable";

export type TodoPriorityOption = {
	label: string;
	value: TodoPriority;
};

export type TodoPrioritySelectProps = {
	value: TodoPriority;
	onChange: (value: TodoPriority) => void;
	options: TodoPriorityOption[];
	label?: string;
	className?: string;
	selectClassName?: string;
};

export function TodoPrioritySelect({
	value,
	onChange,
	options,
	label = "Priority",
	className,
	selectClassName,
}: TodoPrioritySelectProps) {
	return (
		<div className={cn("space-y-2", className)}>
			<span className="block text-sm font-medium text-[#191C1D]">{label}</span>
			<Select
				value={value}
				onValueChange={(nextValue) => onChange(nextValue as TodoPriority)}
			>
				<SelectTrigger
					className={cn(
						"h-10 w-full border-[#CBD5E1] bg-white px-3",
						selectClassName,
					)}
				>
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<SelectContent
					position="popper"
					side="bottom"
					align="start"
					sideOffset={6}
					className="z-[70] w-[var(--radix-select-trigger-width)]"
				>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
