import { Check, ChevronLeft, ChevronRight, PanelRightOpen, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ComponentProps, FormEvent, MouseEvent } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";

import {
	budgetLabels,
	budgetRanges,
	defaultMultistepValues,
	multistepFormSchema,
	stepFieldNames,
	teamSizeLabels,
	teamSizes,
	timelineLabels,
	timelines,
	type MultistepFormValues,
} from "@/components/forms/multistep-drawer/schema";
import { useMultistepDraftStore } from "@/components/forms/multistep-drawer/store";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const steps = [
	{
		title: "Contact",
		description: "Who should we follow up with?",
	},
	{
		title: "Company",
		description: "A few details about the team.",
	},
	{
		title: "Project",
		description: "What are you trying to build?",
	},
];

const fieldLabels: Record<keyof MultistepFormValues, string> = {
	firstName: "First name",
	lastName: "Last name",
	email: "Email",
	company: "Company",
	role: "Role",
	teamSize: "Team size",
	budget: "Budget",
	timeline: "Timeline",
	goal: "Project goal",
};

function areValuesEqual(first: MultistepFormValues, second: MultistepFormValues) {
	return JSON.stringify(first) === JSON.stringify(second);
}

function getFieldErrors(error: unknown) {
	const parsedError = error as {
		issues?: Array<{ path: PropertyKey[]; message: string }>;
	};

	return (parsedError.issues ?? []).reduce<Partial<Record<keyof MultistepFormValues, string>>>(
		(errors, issue) => {
			const fieldName = issue.path[0] as keyof MultistepFormValues | undefined;

			if (fieldName) {
				errors[fieldName] = issue.message;
			}

			return errors;
		},
		{},
	);
}

function ErrorText({ message }: { message?: string }) {
	if (!message) return null;

	return <p className="text-xs font-medium text-destructive">{message}</p>;
}

function TextField({
	error,
	id,
	label,
	...props
}: ComponentProps<typeof Input> & {
	error?: string;
	id: keyof MultistepFormValues;
	label: string;
}) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={id} className="text-foreground">
				{label}
			</Label>
			<Input
				id={id}
				aria-invalid={Boolean(error)}
				className="h-11 bg-white text-foreground dark:bg-white/10"
				{...props}
			/>
			<ErrorText message={error} />
		</div>
	);
}

function SelectField({
	error,
	id,
	label,
	options,
	...props
}: ComponentProps<"select"> & {
	error?: string;
	id: keyof MultistepFormValues;
	label: string;
	options: Array<{ label: string; value: string }>;
}) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={id} className="text-foreground">
				{label}
			</Label>
			<select
				id={id}
				aria-invalid={Boolean(error)}
				className="h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-white/10"
				{...props}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ErrorText message={error} />
		</div>
	);
}

type MultiStepDrawerFormProps = {
	embedded?: boolean;
};

export function MultiStepDrawerForm({ embedded = false }: MultiStepDrawerFormProps) {
	const [open, setOpen] = useState(false);
	const [stepIndex, setStepIndex] = useState(0);
	const draft = useMultistepDraftStore((state) => state.draft);
	const submitted = useMultistepDraftStore((state) => state.submitted);
	const updateDraft = useMultistepDraftStore((state) => state.updateDraft);
	const saveSubmitted = useMultistepDraftStore((state) => state.saveSubmitted);

	const form = useForm<MultistepFormValues>({
		defaultValues: defaultMultistepValues,
		mode: "onTouched",
	});

	const watchedValues = useWatch({ control: form.control });
	const currentStep = steps[stepIndex];
	const isLastStep = stepIndex === steps.length - 1;
	const errors = form.formState.errors;

	useEffect(() => {
		if (open) {
			form.reset(draft);
		}
	}, [draft, form, open]);

	useEffect(() => {
		if (!open) return;

		const values = {
			...defaultMultistepValues,
			...watchedValues,
		} as MultistepFormValues;

		if (!areValuesEqual(values, draft)) {
			updateDraft(values);
		}
	}, [draft, open, updateDraft, watchedValues]);

	const progress = useMemo(() => ((stepIndex + 1) / steps.length) * 100, [stepIndex]);

	const handleOpenChange = (nextOpen: boolean) => {
		if (nextOpen) {
			setStepIndex(0);
		}

		setOpen(nextOpen);
	};

	const setSchemaErrors = (
		nextErrors: Partial<Record<keyof MultistepFormValues, string>>,
	) => {
		Object.entries(nextErrors).forEach(([field, message]) => {
			form.setError(field as keyof MultistepFormValues, {
				type: "manual",
				message,
			});
		});
	};

	const validateCurrentStep = async () => {
		const fieldNames = stepFieldNames[stepIndex];
		const values = form.getValues();
		const schemaShape = multistepFormSchema.shape;
		let isValid = true;

		fieldNames.forEach((fieldName) => form.clearErrors(fieldName));

		fieldNames.forEach((fieldName) => {
			const result = schemaShape[fieldName].safeParse(values[fieldName]);

			if (!result.success) {
				isValid = false;
				form.setError(fieldName, {
					type: "manual",
					message: result.error.issues[0]?.message ?? "This field is invalid.",
				});
			}
		});

		return isValid;
	};

	const handleNext = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (await validateCurrentStep()) {
			setStepIndex((current) => Math.min(current + 1, steps.length - 1));
		}
	};

	const handleBack = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setStepIndex((current) => Math.max(current - 1, 0));
	};

	const handleSubmit = async (values: MultistepFormValues) => {
		const result = multistepFormSchema.safeParse(values);

		if (!result.success) {
			setSchemaErrors(getFieldErrors(result.error));
			const firstInvalidStep = stepFieldNames.findIndex((fieldNames) =>
				fieldNames.some((fieldName) =>
					Boolean((form.formState.errors as FieldErrors<MultistepFormValues>)[fieldName]),
				),
			);

			if (firstInvalidStep >= 0) {
				setStepIndex(firstInvalidStep);
			}

			return;
		}

		saveSubmitted(result.data);
		form.reset(defaultMultistepValues);
		setStepIndex(0);
		setOpen(false);
	};

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		if (!isLastStep) {
			event.preventDefault();

			if (await validateCurrentStep()) {
				setStepIndex((current) => Math.min(current + 1, steps.length - 1));
			}

			return;
		}

		void form.handleSubmit(handleSubmit)(event);
	};

	return (
		<section
			className={cn(
				"text-foreground",
				embedded
					? "min-h-full bg-transparent p-0"
					: "min-h-[calc(100dvh-72px)] bg-[#F8FAFC] px-4 py-10 dark:bg-[#08090A] sm:px-6 lg:px-8",
			)}
		>
			<div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_360px]">
				<div className="flex min-h-[520px] flex-col justify-between rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111315] sm:p-8">
					<div className="space-y-5">
						<div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
							<PanelRightOpen className="size-5" />
						</div>
						<div className="max-w-2xl space-y-3">
							<h1 className="font-heading text-3xl font-semibold tracking-normal text-black dark:text-white sm:text-4xl">
								Multi-step drawer form
							</h1>
							<p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
								Collect contact, company, and project details in a drawer. Draft values stay in
								Zustand while the drawer is closed, then clear after a successful submit.
							</p>
						</div>
					</div>

					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Drawer open={open} onOpenChange={handleOpenChange} direction="right">
							<DrawerTrigger asChild>
								<Button type="button" className="gap-2">
									Open form
									<ChevronRight className="size-4" />
								</Button>
							</DrawerTrigger>
							<DrawerContent className="w-full max-w-[520px] overflow-y-auto border-white/10 bg-card">
								<form onSubmit={handleFormSubmit} className="flex min-h-dvh flex-col">
									<DrawerHeader className="border-b border-border px-6 py-5 text-left">
										<div className="mb-3 flex items-center justify-between gap-4">
											<div className="flex min-w-0 items-center gap-4">
												<div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
													Step {stepIndex + 1} of {steps.length}
												</div>
												<div className="h-2 w-28 overflow-hidden rounded-full bg-muted">
													<div
														className="h-full rounded-full bg-foreground transition-all"
														style={{ width: `${progress}%` }}
													/>
												</div>
											</div>
											<Button
												aria-label="Close form"
												type="button"
												variant="ghost"
												size="icon-sm"
												onClick={() => setOpen(false)}
											>
												<X className="size-4" />
											</Button>
										</div>
										<DrawerTitle className="text-xl">{currentStep.title}</DrawerTitle>
										<DrawerDescription>{currentStep.description}</DrawerDescription>
									</DrawerHeader>

									<div className="grid flex-1 gap-5 px-6 py-6">
										{stepIndex === 0 && (
											<div className="grid gap-4">
												<div className="grid gap-4 sm:grid-cols-2">
													<TextField
														id="firstName"
														label={fieldLabels.firstName}
														error={errors.firstName?.message}
														{...form.register("firstName")}
													/>
													<TextField
														id="lastName"
														label={fieldLabels.lastName}
														error={errors.lastName?.message}
														{...form.register("lastName")}
													/>
												</div>
												<TextField
													id="email"
													type="email"
													label={fieldLabels.email}
													error={errors.email?.message}
													{...form.register("email")}
												/>
											</div>
										)}

										{stepIndex === 1 && (
											<div className="grid gap-4">
												<TextField
													id="company"
													label={fieldLabels.company}
													error={errors.company?.message}
													{...form.register("company")}
												/>
												<TextField
													id="role"
													label={fieldLabels.role}
													error={errors.role?.message}
													{...form.register("role")}
												/>
												<div className="grid gap-4 sm:grid-cols-2">
													<SelectField
														id="teamSize"
														label={fieldLabels.teamSize}
														error={errors.teamSize?.message}
														options={teamSizes.map((value) => ({
															value,
															label: teamSizeLabels[value],
														}))}
														{...form.register("teamSize")}
													/>
													<SelectField
														id="budget"
														label={fieldLabels.budget}
														error={errors.budget?.message}
														options={budgetRanges.map((value) => ({
															value,
															label: budgetLabels[value],
														}))}
														{...form.register("budget")}
													/>
												</div>
											</div>
										)}

										{stepIndex === 2 && (
											<div className="grid gap-4">
												<SelectField
													id="timeline"
													label={fieldLabels.timeline}
													error={errors.timeline?.message}
													options={timelines.map((value) => ({
														value,
														label: timelineLabels[value],
													}))}
													{...form.register("timeline")}
												/>
												<div className="grid gap-2">
													<Label htmlFor="goal" className="text-foreground">
														{fieldLabels.goal}
													</Label>
													<textarea
														id="goal"
														aria-invalid={Boolean(errors.goal)}
														className="min-h-32 w-full resize-none rounded-lg border border-input bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-white/10"
														placeholder="Tell us what success looks like."
														{...form.register("goal")}
													/>
													<ErrorText message={errors.goal?.message} />
												</div>
											</div>
										)}
									</div>

									<DrawerFooter className="border-t border-border px-6 py-5">
										<div className="grid grid-cols-2 gap-3">
											<Button
												type="button"
												variant="secondary"
												onClick={handleBack}
												disabled={stepIndex === 0}
												className="gap-2"
											>
												<ChevronLeft className="size-4" />
												Back
											</Button>
											{isLastStep ? (
												<Button type="submit" className="gap-2">
													Submit
													<Check className="size-4" />
												</Button>
											) : (
												<Button type="button" onClick={handleNext} className="gap-2">
													Next
													<ChevronRight className="size-4" />
												</Button>
											)}
										</div>
									</DrawerFooter>
								</form>
							</DrawerContent>
						</Drawer>

						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							Close the drawer before submitting, then reopen it to see your draft restored.
						</p>
					</div>
				</div>

				<Card className="rounded-xl bg-white dark:bg-[#111315]">
					<CardHeader>
						<CardTitle>Submitted details</CardTitle>
						<CardDescription>The summary appears only after final submit.</CardDescription>
					</CardHeader>
					<CardContent>
						{submitted ? (
							<div className="grid gap-4 text-sm">
								<div>
									<p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
										Contact
									</p>
									<p className="mt-1 font-medium">
										{submitted.firstName} {submitted.lastName}
									</p>
									<p className="text-muted-foreground">{submitted.email}</p>
								</div>
								<div className="grid gap-2 rounded-lg border border-border bg-muted/40 p-3">
									<SummaryRow label="Company" value={submitted.company} />
									<SummaryRow label="Role" value={submitted.role} />
									<SummaryRow label="Team" value={teamSizeLabels[submitted.teamSize]} />
									<SummaryRow label="Budget" value={budgetLabels[submitted.budget]} />
									<SummaryRow label="Timeline" value={timelineLabels[submitted.timeline]} />
								</div>
								<div>
									<p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
										Project goal
									</p>
									<p className="mt-1 leading-6">{submitted.goal}</p>
								</div>
							</div>
						) : (
							<div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
								<p className="max-w-60 text-sm leading-6 text-muted-foreground">
									No submission yet. The drawer draft is separate from this final summary.
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<div className={cn("flex items-center justify-between gap-4")}>
			<span className="text-muted-foreground">{label}</span>
			<span className="text-right font-medium">{value}</span>
		</div>
	);
}
