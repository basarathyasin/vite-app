import * as React from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	TodoDeleteConfirmDialog,
	type TodoDeleteConfirmDialogCopy,
} from "@/components/platform/TodoDeleteConfirmDialog";
import {
	TodoToastStack,
	type TodoToastItem,
	type TodoToastStackClassNames,
	type TodoToastTone,
} from "@/components/platform/TodoToastStack";
import {
	TodoTaskForm,
	type TodoTaskFormCopy,
	type TodoTaskFormValues,
} from "@/components/platform/TodoTaskForm";
import { TodoTaskDrawer } from "@/components/platform/TodoTaskDrawer";
import { cn } from "@/lib/utils";

export type TodoStatus = "todo" | "done";
export type TodoPriority = "low" | "medium" | "high";

export type TodoItem = {
	id: string;
	title: string;
	status: TodoStatus;
	priority: TodoPriority;
	dueDate?: string;
};

export type TodoTableToastCopy = {
	deletedTitle: string;
	deletedDescription: string;
	completedTitle: string;
	completedDescription: string;
	reopenedTitle: string;
	reopenedDescription: string;
	updatedTitle: string;
	updatedDescription: string;
};

export type TodoTableCopy = {
	title: string;
	subtitle: string;
	searchPlaceholder: string;
	emptyTitle: string;
	emptyDescription: string;
	addButton: string;
	drawerTitle: string;
	editDrawerTitle: string;
	form?: Partial<TodoTaskFormCopy>;
	editForm?: Partial<TodoTaskFormCopy>;
	deleteDialog?: Partial<TodoDeleteConfirmDialogCopy>;
	toast?: Partial<TodoTableToastCopy>;
};

export type TodoTableClassNames = {
	root?: string;
	header?: string;
	tableShell?: string;
	row?: string;
	toasts?: TodoToastStackClassNames;
};

export type TodoTableProps = {
	todos: TodoItem[];
	onCreate?: (values: TodoTaskFormValues) => void;
	onUpdate?: (id: string, patch: Partial<TodoItem>) => void;
	onDelete?: (id: string) => void;
	onToggleStatus?: (id: string, status: TodoStatus) => void;
	isCreating?: boolean;
	deletingIds?: string[];
	copy?: Partial<TodoTableCopy>;
	priorityOptions?: Array<{ label: string; value: TodoPriority }>;
	visibleColumns?: Array<
		"completed" | "task" | "priority" | "dueDate" | "actions"
	>;
	classNames?: TodoTableClassNames;
};

const defaultCopy: TodoTableCopy = {
	title: "Tasks",
	subtitle: "Create, update, complete, and remove your to-dos.",
	searchPlaceholder: "Search tasks...",
	emptyTitle: "No tasks yet",
	emptyDescription: "Add your first task to start organizing the day.",
	addButton: "Add task",
	drawerTitle: "Add task",
	editDrawerTitle: "Edit task",
	toast: {
		deletedTitle: "Task deleted",
		deletedDescription: "The task was removed from your list.",
		completedTitle: "Task completed",
		completedDescription: "Nice, that task is now marked done.",
		reopenedTitle: "Task reopened",
		reopenedDescription: "The task is back in your to-do list.",
		updatedTitle: "Task updated",
		updatedDescription: "Your task details were saved.",
	},
};

const defaultToastCopy: TodoTableToastCopy = {
	deletedTitle: "Task deleted",
	deletedDescription: "The task was removed from your list.",
	completedTitle: "Task completed",
	completedDescription: "Nice, that task is now marked done.",
	reopenedTitle: "Task reopened",
	reopenedDescription: "The task is back in your to-do list.",
	updatedTitle: "Task updated",
	updatedDescription: "Your task details were saved.",
};

const defaultPriorityOptions: NonNullable<TodoTableProps["priorityOptions"]> = [
	{ label: "Low", value: "low" },
	{ label: "Medium", value: "medium" },
	{ label: "High", value: "high" },
];

const defaultVisibleColumns: NonNullable<TodoTableProps["visibleColumns"]> = [
	"completed",
	"task",
	"priority",
	"dueDate",
	"actions",
];

export function TodoTable({
	todos,
	copy,
	priorityOptions = defaultPriorityOptions,
	visibleColumns = defaultVisibleColumns,
	classNames,
	onCreate,
	onDelete,
	onUpdate,
	onToggleStatus,
	isCreating = false,
	deletingIds = [],
}: TodoTableProps) {
	const text = {
		...defaultCopy,
		...copy,
		toast: {
			...defaultToastCopy,
			...copy?.toast,
		},
	};

	const [query, setQuery] = React.useState("");
	const [drawerMode, setDrawerMode] = React.useState<"create" | "edit" | null>(
		null,
	);
	const [editingId, setEditingId] = React.useState<string | null>(null);
	const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(
		null,
	);
	const [toasts, setToasts] = React.useState<TodoToastItem[]>([]);
	const toastTimeoutsRef = React.useRef<Array<ReturnType<typeof setTimeout>>>(
		[],
	);

	React.useEffect(() => {
		const toastTimeouts = toastTimeoutsRef.current;

		return () => {
			toastTimeouts.forEach(clearTimeout);
		};
	}, []);

	const columns = React.useMemo(
		() => new Set(visibleColumns),
		[visibleColumns],
	);

	const filteredTodos = React.useMemo(() => {
		const q = query.trim().toLowerCase();

		return todos.filter((todo) => todo.title.toLowerCase().includes(q));
	}, [todos, query]);

	const editingTodo = todos.find((todo) => todo.id === editingId);
	const deleteTarget = todos.find((todo) => todo.id === deleteTargetId);

	const editDrawerValues = React.useMemo(
		() =>
			editingTodo && {
				title: editingTodo.title,
				priority: editingTodo.priority,
				dueDate: editingTodo.dueDate,
			},
		[editingTodo],
	);

	const closeTaskDrawer = () => {
		setDrawerMode(null);
		setEditingId(null);
	};

	const openCreateDrawer = () => {
		setDrawerMode("create");
		setEditingId(null);
	};

	const openEditDrawer = (id: string) => {
		setEditingId(id);
		setDrawerMode("edit");
	};

	const addTodo = (values: TodoTaskFormValues) => {
		onCreate?.(values);
		closeTaskDrawer();
	};

	const addToast = (
		title: string,
		description: string,
		tone: TodoToastTone = "success",
	) => {
		const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
		setToasts((currentToasts) => [
			...currentToasts,
			{ id, title, description, tone },
		]);

		const timeout = setTimeout(() => {
			setToasts((current) => current.filter((toast) => toast.id !== id));

			toastTimeoutsRef.current = toastTimeoutsRef.current.filter(
				(t) => t !== timeout,
			);
		}, 3000);

		toastTimeoutsRef.current.push(timeout);
	};

	const deleteTodo = (id: string) => {
		onDelete?.(id);
	};

	const editTodo = (values: TodoTaskFormValues) => {
		if (!editingTodo) return;
		onUpdate?.(editingTodo.id, {
			title: values.title,
			priority: values.priority,
			dueDate: values.dueDate,
		});
		closeTaskDrawer();
		addToast(text.toast.updatedTitle, text.toast.updatedDescription, "success");
	};

	const confirmDelete = () => {
		if (!deleteTarget) return;
		deleteTodo(deleteTarget.id);
		setDeleteTargetId(null);
		addToast(text.toast.deletedTitle, text.toast.deletedDescription, "danger");
	};

	const priorityLabels = React.useMemo(
		() =>
			Object.fromEntries(
				priorityOptions.map((p) => [p.value, p.label]),
			) as Record<TodoPriority, string>,
		[priorityOptions],
	);
	const getPriorityLabel = (priority: TodoPriority) =>
		priorityLabels[priority] ?? priority;

	return (
		<section className={cn("space-y-5", classNames?.root)}>
			<TodoToastStack toasts={toasts} classNames={classNames?.toasts} />
			<TodoTaskDrawer
				open={drawerMode !== null}
				onOpenChange={(open) => {
					if (!open) closeTaskDrawer();
				}}
				title={drawerMode === "edit" ? text.editDrawerTitle : text.drawerTitle}
			>
				<TodoTaskForm
					key={drawerMode === "edit" ? editingTodo?.id : "create-task-form"}
					onSubmit={drawerMode === "edit" ? editTodo : addTodo}
					onCancel={closeTaskDrawer}
					copy={{
						...(drawerMode === "edit"
							? { submitButton: "Save task", ...text.editForm }
							: text.form),
					}}
					priorityOptions={priorityOptions}
					defaultValues={drawerMode === "edit" ? editDrawerValues : undefined}
				/>
			</TodoTaskDrawer>
			<TodoDeleteConfirmDialog
				open={Boolean(deleteTarget)}
				onOpenChange={(open) => {
					if (!open) setDeleteTargetId(null);
				}}
				onConfirm={confirmDelete}
				taskTitle={deleteTarget?.title}
				copy={text.deleteDialog}
			/>

			<div
				className={cn(
					"flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
					classNames?.header,
				)}
			>
				<div>
					<h2 className="font-heading text-2xl font-semibold text-[#191C1D] dark:text-white">
						{text.title}
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">{text.subtitle}</p>
				</div>

				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<div className="relative sm:w-64">
						<Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={text.searchPlaceholder}
							className="pl-8"
						/>
					</div>

					<Button
						type="button"
						size="sm"
						onClick={openCreateDrawer}
						className="gap-2"
						disabled={isCreating}
					>
						<Plus className="size-4" />
						{text.addButton}
					</Button>
				</div>
			</div>

			<div
				className={cn(
					"overflow-hidden rounded-xl border bg-white dark:border-white/10 dark:bg-[#101214]",
					classNames?.tableShell,
				)}
			>
				<Table>
					<TableHeader>
						<TableRow>
							{columns.has("completed") && (
								<TableHead className="w-12 px-4">Done</TableHead>
							)}
							{columns.has("task") && (
								<TableHead className="min-w-[260px] px-4">Task</TableHead>
							)}
							{columns.has("priority") && <TableHead>Priority</TableHead>}
							{columns.has("dueDate") && <TableHead>Due date</TableHead>}
							{columns.has("actions") && (
								<TableHead className="w-[152px] text-right">Actions</TableHead>
							)}
						</TableRow>
					</TableHeader>

					<TableBody>
						{filteredTodos.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={visibleColumns.length}
									className="h-40 text-center"
								>
									<div>
										<p className="font-medium text-[#191C1D] dark:text-white">
											{text.emptyTitle}
										</p>
										<p className="mt-1 text-sm text-muted-foreground">
											{text.emptyDescription}
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							filteredTodos.map((todo) => (
								<TableRow key={todo.id} className={classNames?.row}>
									{columns.has("completed") && (
										<TableCell className="px-4">
											<input
												type="checkbox"
												checked={todo.status === "done"}
												onChange={(event) => {
													const isDone = event.target.checked;
													onToggleStatus?.(todo.id, isDone ? "done" : "todo");
													addToast(
														isDone
															? text.toast.completedTitle
															: text.toast.reopenedTitle,
														isDone
															? text.toast.completedDescription
															: text.toast.reopenedDescription,
														isDone ? "success" : "info",
													);
												}}
												aria-label={
													todo.status === "done"
														? "Mark task todo"
														: "Mark task done"
												}
												className="size-4 rounded border-input accent-[#191C1D] dark:accent-white"
											/>
										</TableCell>
									)}

									{columns.has("task") && (
										<TableCell className="px-4">
											<span
												className={cn(
													"font-medium text-[#191C1D] dark:text-white",
													todo.status === "done" &&
														"text-muted-foreground line-through dark:text-zinc-500",
												)}
											>
												{todo.title}
											</span>
										</TableCell>
									)}

									{columns.has("priority") && (
										<TableCell>
											<span className="text-sm text-[#191C1D] dark:text-zinc-200">
												{getPriorityLabel(todo.priority)}
											</span>
										</TableCell>
									)}

									{columns.has("dueDate") && (
										<TableCell>
											<span className="text-sm text-[#191C1D] dark:text-zinc-200">
												{todo.dueDate || "No date"}
											</span>
										</TableCell>
									)}

									{columns.has("actions") && (
										<TableCell className="text-right">
											<div className="ml-auto flex w-fit items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-1 dark:border-white/10 dark:bg-white/5">
												<Button
													type="button"
													size="icon-xs"
													variant="secondary"
													className="size-9 rounded-lg border border-[#93C5FD] bg-[#DBEAFE] p-2 text-[#075985] shadow-none hover:bg-[#BFDBFE] dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-200 dark:hover:bg-sky-400/20"
													onClick={() => openEditDrawer(todo.id)}
													aria-label="Edit task"
												>
													<Pencil className="size-4" />
												</Button>
												<Button
													type="button"
													size="icon-xs"
													variant="destructive"
													className="size-9 rounded-lg border border-[#FCA5A5] bg-[#FEE2E2] p-2 text-[#B91C1C] shadow-none hover:bg-[#FECACA] dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200 dark:hover:bg-red-400/20"
													onClick={() => setDeleteTargetId(todo.id)}
													aria-label="Delete task"
													disabled={deletingIds.includes(todo.id)}
												>
													<Trash2 className="size-4" />
												</Button>
											</div>
										</TableCell>
									)}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
