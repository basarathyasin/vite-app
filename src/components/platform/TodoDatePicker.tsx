import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export type TodoDatePickerCopy = {
	label: string;
	placeholder: string;
	clearButton: string;
	doneButton: string;
};

export type TodoDatePickerProps = {
	value?: string;
	onChange: (value: string | undefined) => void;
	copy?: Partial<TodoDatePickerCopy>;
	className?: string;
	buttonClassName?: string;
	error?: string;
};

const defaultCopy: TodoDatePickerCopy = {
	label: "Due date",
	placeholder: "Pick a due date",
	clearButton: "Clear",
	doneButton: "Done",
};

function parseDateValue(value?: string) {
	if (!value) return undefined;
	const [year, month, day] = value.split("-").map(Number);
	if (!year || !month || !day) return undefined;
	return new Date(year, month - 1, day);
}

function formatDateValue(date?: Date) {
	if (!date) return undefined;
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function getToday() {
	const today = new Date();
	return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function TodoDatePicker({
	value,
	onChange,
	copy,
	className,
	buttonClassName,
	error,
}: TodoDatePickerProps) {
	const text = { ...defaultCopy, ...copy };
	const [open, setOpen] = useState(false);
	const selectedDate = parseDateValue(value);

	return (
		<div className={cn("space-y-2", className)}>
			<span className="block text-sm font-medium text-[#191C1D]">
				{text.label}
			</span>
			<Button
				type="button"
				variant="outline"
				className={cn(
					"h-10 w-full justify-between rounded-lg border-[#CBD5E1] bg-white px-3 font-normal",
					!value && "text-muted-foreground",
					error && "border-red-500",
					buttonClassName,
				)}
				onClick={() => setOpen((current) => !current)}
			>
				<span>{value || text.placeholder}</span>
				<CalendarIcon className="size-4" />
			</Button>

			{open && (
				<div
					className="fixed inset-0 z-[80] flex items-center justify-center bg-black/10 px-4"
					onClick={() => setOpen(false)}
				>
					<div
						className="w-fit rounded-xl border bg-white p-3 shadow-xl"
						onClick={(event) => event.stopPropagation()}
					>
						<Calendar
							mode="single"
							selected={selectedDate}
							disabled={{ before: getToday() }}
							onSelect={(date) => {
								onChange(formatDateValue(date));
								if (date) {
									setOpen(false);
								}
							}}
						/>
						<div className="-mx-3 -mb-3 mt-2 flex justify-end gap-2 border-t p-3">
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => {
									onChange(undefined);
									setOpen(false);
								}}
							>
								{text.clearButton}
							</Button>
							<Button type="button" size="sm" onClick={() => setOpen(false)}>
								{text.doneButton}
							</Button>
						</div>
					</div>
				</div>
			)}

			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
}
