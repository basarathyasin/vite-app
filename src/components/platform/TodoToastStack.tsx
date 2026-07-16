import { CheckCircle2, Info, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type TodoToastTone = "success" | "danger" | "info";

export type TodoToastItem = {
	id: string;
	title: string;
	description?: string;
	tone?: TodoToastTone;
};

export type TodoToastStackClassNames = {
	root?: string;
	item?: string;
};

export type TodoToastStackProps = {
	toasts: TodoToastItem[];
	classNames?: TodoToastStackClassNames;
};

function ToastIcon({ tone }: { tone: TodoToastTone }) {
	if (tone === "danger") return <Trash2 className="size-4" />;
	if (tone === "info") return <Info className="size-4" />;
	return <CheckCircle2 className="size-4" />;
}

export function TodoToastStack({ toasts, classNames }: TodoToastStackProps) {
	if (toasts.length === 0) return null;

	return (
		<div
			aria-live="polite"
			className={cn(
				"fixed bottom-5 right-5 z-50 grid w-[min(360px,calc(100vw-32px))] gap-2",
				classNames?.root,
			)}
		>
			{toasts.map((toast) => {
				const tone = toast.tone ?? "success";

				return (
					<div
						key={toast.id}
						className={cn(
							"rounded-xl border bg-white p-4 text-sm shadow-lg",
							tone === "success" && "border-emerald-200 text-emerald-950",
							tone === "danger" && "border-red-200 text-red-950",
							tone === "info" && "border-blue-200 text-blue-950",
							classNames?.item,
						)}
					>
						<div className="flex gap-3">
							<div
								className={cn(
									"mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
									tone === "success" && "bg-emerald-100 text-emerald-700",
									tone === "danger" && "bg-red-100 text-red-700",
									tone === "info" && "bg-blue-100 text-blue-700",
								)}
							>
								<ToastIcon tone={tone} />
							</div>

							<div>
								<p className="font-medium">{toast.title}</p>
								{toast.description && (
									<p className="mt-1 text-muted-foreground">
										{toast.description}
									</p>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
