import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type TodoDeleteConfirmDialogCopy = {
	title: string;
	description: string;
	cancelButton: string;
	confirmButton: string;
};

export type TodoDeleteConfirmDialogClassNames = {
	content?: string;
	footer?: string;
};

export type TodoDeleteConfirmDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	taskTitle?: string;
	copy?: Partial<TodoDeleteConfirmDialogCopy>;
	classNames?: TodoDeleteConfirmDialogClassNames;
};

const defaultCopy: TodoDeleteConfirmDialogCopy = {
	title: "Delete task?",
	description: "This task will be removed from your list.",
	cancelButton: "No",
	confirmButton: "Yes, delete",
};

export function TodoDeleteConfirmDialog({
	open,
	onOpenChange,
	onConfirm,
	taskTitle,
	copy,
	classNames,
}: TodoDeleteConfirmDialogProps) {
	const text = { ...defaultCopy, ...copy };

	const confirmDelete = () => {
		onConfirm();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className={classNames?.content}>
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-[#191C1D]">
						{text.title}
					</DialogTitle>
					<DialogDescription className="leading-6">
						{taskTitle ? `${text.description} "${taskTitle}"` : text.description}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className={cn("gap-2", classNames?.footer)}>
					<DialogClose asChild>
						<Button type="button" variant="outline" size="sm">
							{text.cancelButton}
						</Button>
					</DialogClose>
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onClick={confirmDelete}
					>
						{text.confirmButton}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
