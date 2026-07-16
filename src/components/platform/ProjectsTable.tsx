import {
	Check,
	ChevronLeft,
	ChevronRight,
	Plus,
	Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ComponentProps, FormEvent, MouseEvent } from "react";
import { useForm, useWatch } from "react-hook-form";

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

const steps = [
	{ title: "Contact", description: "Start with the project owner details." },
	{ title: "Company", description: "Add the business context for this request." },
	{ title: "Project", description: "Capture budget, timeline, and the project goal." },
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

function valuesMatch(first: MultistepFormValues, second: MultistepFormValues) {
	return JSON.stringify(first) === JSON.stringify(second);
}

function FieldError({ message }: { message?: string }) {
	if (!message) return null;

	return <p className="text-xs font-medium text-destructive">{message}</p>;
}

export function ProjectsTable() {
	const [open, setOpen] = useState(false);
	const [stepIndex, setStepIndex] = useState(0);
	const [query, setQuery] = useState("");
	const draft = useMultistepDraftStore((state) => state.draft);
	const projects = useMultistepDraftStore((state) => state.projects);
	const updateDraft = useMultistepDraftStore((state) => state.updateDraft);
	const saveProject = useMultistepDraftStore((state) => state.saveProject);

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

		if (!valuesMatch(values, draft)) {
			updateDraft(values);
		}
	}, [draft, open, updateDraft, watchedValues]);

	const visibleProjects = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		if (!normalizedQuery) return projects;

		return projects.filter((project) =>
			[
				project.company,
				project.firstName,
				project.lastName,
				project.email,
				project.goal,
			]
				.join(" ")
				.toLowerCase()
				.includes(normalizedQuery),
		);
	}, [projects, query]);

	const progress = ((stepIndex + 1) / steps.length) * 100;

	const handleOpenChange = (nextOpen: boolean) => {
		if (nextOpen) {
			setStepIndex(0);
		}

		setOpen(nextOpen);
	};

	const validateCurrentStep = async () => {
		const values = form.getValues();
		const fieldNames = stepFieldNames[stepIndex];
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

	const handleBack = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setStepIndex((current) => Math.max(current - 1, 0));
	};

	const handleNext = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (await validateCurrentStep()) {
			setStepIndex((current) => Math.min(current + 1, steps.length - 1));
		}
	};

	const handleFinalSubmit = (values: MultistepFormValues) => {
		const result = multistepFormSchema.safeParse(values);

		if (!result.success) {
			const firstInvalidPath = result.error.issues[0]?.path[0] as
				| keyof MultistepFormValues
				| undefined;

			result.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof MultistepFormValues | undefined;

				if (fieldName) {
					form.setError(fieldName, {
						type: "manual",
						message: issue.message,
					});
				}
			});

			const firstInvalidStep = stepFieldNames.findIndex((fieldNames) =>
				firstInvalidPath
					? fieldNames.some((fieldName) => fieldName === firstInvalidPath)
					: false,
			);

			if (firstInvalidStep >= 0) {
				setStepIndex(firstInvalidStep);
			}

			return;
		}

		saveProject(result.data);
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

		void form.handleSubmit(handleFinalSubmit)(event);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h2 className="font-heading text-2xl font-semibold text-foreground">
						Projects
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Create project requests and keep submitted details in one place.
					</p>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<div className="relative min-w-0 sm:w-72">
						<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search projects..."
							className="h-11 bg-card pl-9 text-foreground dark:bg-white/10"
						/>
					</div>

					<ProjectDrawer
						form={form}
						open={open}
						onOpenChange={handleOpenChange}
						currentStep={currentStep}
						stepIndex={stepIndex}
						progress={progress}
						isLastStep={isLastStep}
						errors={errors}
							onBack={handleBack}
							onNext={handleNext}
							onSubmit={handleFormSubmit}
						/>
				</div>
			</div>

			<div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[960px] text-left text-sm">
						<thead className="border-b border-border bg-muted/60 text-muted-foreground">
							<tr>
								<th className="px-5 py-4 font-semibold">Project</th>
								<th className="px-5 py-4 font-semibold">Owner</th>
								<th className="px-5 py-4 font-semibold">Team</th>
								<th className="px-5 py-4 font-semibold">Budget</th>
								<th className="px-5 py-4 font-semibold">Timeline</th>
								<th className="px-5 py-4 font-semibold">Goal</th>
								<th className="px-5 py-4 text-right font-semibold">Created</th>
							</tr>
						</thead>
						<tbody>
							{visibleProjects.length > 0 ? (
								visibleProjects.map((project) => (
									<tr key={project.id} className="border-b border-border last:border-b-0">
										<td className="px-5 py-4 font-medium text-foreground">
											{project.company}
										</td>
										<td className="px-5 py-4">
											<div className="font-medium text-foreground">
												{project.firstName} {project.lastName}
											</div>
											<div className="text-muted-foreground">{project.email}</div>
										</td>
										<td className="px-5 py-4 text-muted-foreground">
											{teamSizeLabels[project.teamSize]}
										</td>
										<td className="px-5 py-4 text-muted-foreground">
											{budgetLabels[project.budget]}
										</td>
										<td className="px-5 py-4 text-muted-foreground">
											{timelineLabels[project.timeline]}
										</td>
										<td className="max-w-[280px] px-5 py-4 text-muted-foreground">
											<p className="line-clamp-2">{project.goal}</p>
										</td>
										<td className="px-5 py-4 text-right text-muted-foreground">
											{new Intl.DateTimeFormat("en", {
												month: "short",
												day: "numeric",
												year: "numeric",
											}).format(new Date(project.createdAt))}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7} className="h-48 px-5 py-10 text-center">
										<p className="font-medium text-foreground">
											{projects.length > 0 ? "No projects match your search" : "No projects yet"}
										</p>
										<p className="mt-2 text-muted-foreground">
											{projects.length > 0
												? "Try another project, owner, email, or goal."
												: "Add a new project to see submitted form data here."}
										</p>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

type ProjectDrawerProps = {
	form: ReturnType<typeof useForm<MultistepFormValues>>;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	currentStep: (typeof steps)[number];
	stepIndex: number;
	progress: number;
	isLastStep: boolean;
	errors: ReturnType<typeof useForm<MultistepFormValues>>["formState"]["errors"];
	onBack: (event: MouseEvent<HTMLButtonElement>) => void;
	onNext: (event: MouseEvent<HTMLButtonElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function ProjectDrawer({
	form,
	open,
	onOpenChange,
	currentStep,
	stepIndex,
	progress,
	isLastStep,
	errors,
	onBack,
	onNext,
	onSubmit,
}: ProjectDrawerProps) {
	return (
		<Drawer open={open} onOpenChange={onOpenChange} direction="right">
			<DrawerTrigger asChild>
				<Button type="button" className="gap-2">
					<Plus className="size-4" />
					New project
				</Button>
			</DrawerTrigger>
			<DrawerContent className="!w-[min(460px,calc(100vw-24px))] !max-w-[min(460px,calc(100vw-24px))] overflow-hidden border-border bg-white text-foreground dark:border-white/10 dark:bg-[#181818] dark:text-white data-[vaul-drawer-direction=right]:!w-[min(460px,calc(100vw-24px))] data-[vaul-drawer-direction=right]:!max-w-[min(460px,calc(100vw-24px))] data-[vaul-drawer-direction=right]:rounded-none">
				<form onSubmit={onSubmit} className="flex min-h-dvh flex-col">
					<DrawerHeader className="border-b border-border px-6 py-7 text-left dark:border-white/10">
						<div className="mb-8">
							<DrawerTitle className="text-xl font-semibold text-foreground dark:text-white">
								{currentStep.title}
							</DrawerTitle>
							<DrawerDescription className="mt-2 text-base text-muted-foreground dark:text-zinc-400">
								{currentStep.description}
							</DrawerDescription>
						</div>
						<div className="grid grid-cols-3 gap-3">
							{steps.map((step, index) => (
								<div
									key={step.title}
									className="h-2 overflow-hidden rounded-full bg-muted dark:bg-white/15"
								>
									<div
										className="h-full rounded-full bg-foreground transition-all dark:bg-white"
										style={{
											width:
												index < stepIndex
													? "100%"
													: index === stepIndex
														? `${progress * steps.length - index * 100}%`
														: "0%",
										}}
									/>
								</div>
							))}
						</div>
					</DrawerHeader>

					<div className="grid flex-1 content-start gap-6 px-6 py-7">
						{stepIndex === 0 && (
							<div className="grid gap-6">
								<div className="grid gap-5 sm:grid-cols-2">
									<ProjectInput
										id="firstName"
										label="First name"
										error={errors.firstName?.message}
										{...form.register("firstName")}
									/>
									<ProjectInput
										id="lastName"
										label="Last name"
										error={errors.lastName?.message}
										{...form.register("lastName")}
									/>
								</div>
								<ProjectInput
									id="email"
									type="email"
									label="Email"
									error={errors.email?.message}
									{...form.register("email")}
								/>
							</div>
						)}

						{stepIndex === 1 && (
							<div className="grid gap-6">
								<ProjectInput
									id="company"
									label="Company"
									error={errors.company?.message}
									{...form.register("company")}
								/>
								<ProjectInput
									id="role"
									label="Role"
									error={errors.role?.message}
									{...form.register("role")}
								/>
								<div className="grid gap-5 sm:grid-cols-2">
									<ProjectSelect
										id="teamSize"
										label="Team size"
										error={errors.teamSize?.message}
										options={teamSizes.map((value) => ({
											value,
											label: teamSizeLabels[value],
										}))}
										{...form.register("teamSize")}
									/>
									<ProjectSelect
										id="budget"
										label="Budget"
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
							<div className="grid gap-6">
								<ProjectSelect
									id="timeline"
									label="Timeline"
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
										className="min-h-32 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-white/15 dark:bg-white/5"
										placeholder="Tell us what success looks like."
										{...form.register("goal")}
									/>
									<FieldError message={errors.goal?.message} />
								</div>
							</div>
						)}
					</div>

					<DrawerFooter className="border-t border-border bg-white px-6 py-6 dark:border-white/10 dark:bg-[#181818]">
						<div className="grid grid-cols-2 gap-3">
							<Button
								type="button"
								variant="secondary"
								onClick={onBack}
								disabled={stepIndex === 0}
								className="h-12 gap-2 rounded-xl border-border bg-transparent text-foreground hover:bg-muted dark:border-white/10 dark:bg-transparent dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
							>
								<ChevronLeft className="size-4" />
								Back
							</Button>
							{isLastStep ? (
								<Button type="submit" className="h-12 gap-2 rounded-xl">
									Submit
									<Check className="size-4" />
								</Button>
							) : (
								<Button type="button" onClick={onNext} className="h-12 gap-2 rounded-xl">
									Next
									<ChevronRight className="size-4" />
								</Button>
							)}
						</div>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
}

type ProjectFieldProps = ComponentProps<typeof Input> & {
	error?: string;
	id: keyof MultistepFormValues;
	label: string;
};

function ProjectInput({ error, id, label, ...props }: ProjectFieldProps) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={id} className="text-foreground">
				{label}
			</Label>
			<Input
				id={id}
				aria-invalid={Boolean(error)}
				className="h-10 rounded-lg bg-background text-foreground dark:border-white/15 dark:bg-white/5"
				{...props}
			/>
			<FieldError message={error} />
		</div>
	);
}

type ProjectSelectProps = ComponentProps<"select"> & {
	error?: string;
	id: keyof MultistepFormValues;
	label: string;
	options: Array<{ label: string; value: string }>;
};

function ProjectSelect({ error, id, label, options, ...props }: ProjectSelectProps) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={id} className="text-foreground">
				{label}
			</Label>
			<select
				id={id}
				aria-invalid={Boolean(error)}
				className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-white/15 dark:bg-white/5"
				{...props}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<FieldError message={error} />
		</div>
	);
}
