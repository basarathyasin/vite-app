import * as React from "react";
import { ArrowLeft, ArrowRight, Plus, Search, Send } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	emptyLeadFormValues,
	leadFormSchema,
	type LeadFormValues,
} from "@/components/forms/multistep-drawer/schema";
import { useLeadFormStore } from "@/components/forms/multistep-drawer/store";

export type Project = LeadFormValues & {
	id: string;
	createdAt: string;
};

type Step = {
	title: string;
	description: string;
	fields: Array<keyof LeadFormValues>;
};

const steps: Step[] = [
	{
		title: "Contact",
		description: "Start with the project owner details.",
		fields: ["firstName", "lastName", "email"],
	},
	{
		title: "Company",
		description: "Add the account this project belongs to.",
		fields: ["company", "teamSize"],
	},
	{
		title: "Project",
		description: "Capture the project scope and timing.",
		fields: ["goal", "budget", "timeline"],
	},
];

type ProjectsTableProps = {
	projects: Project[];
	onCreate: (values: LeadFormValues) => void;
};

export function ProjectsTable({ projects, onCreate }: ProjectsTableProps) {
	const [query, setQuery] = React.useState("");
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const filteredProjects = projects.filter((project) => {
		const searchText = [
			project.company,
			project.firstName,
			project.lastName,
			project.email,
			project.goal,
		]
			.join(" ")
			.toLowerCase();

		return searchText.includes(query.trim().toLowerCase());
	});

	const addProject = (values: LeadFormValues) => {
		onCreate(values);
		setDrawerOpen(false);
	};

	return (
		<section className="space-y-5">
			<ProjectFormDrawer
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
				onSubmit={addProject}
			/>

			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h2 className="font-heading text-2xl font-semibold text-[#191C1D] dark:text-white">
						Projects
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Create project requests and keep the submitted details in one place.
					</p>
				</div>

				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<div className="relative sm:w-64">
						<Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search projects..."
							className="pl-8"
						/>
					</div>

					<Button
						type="button"
						size="sm"
						onClick={() => setDrawerOpen(true)}
						className="gap-2"
					>
						<Plus className="size-4" />
						New project
					</Button>
				</div>
			</div>

			<div className="overflow-hidden rounded-xl border bg-white dark:border-white/10 dark:bg-[#101214]">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="min-w-[180px] px-4">Project</TableHead>
							<TableHead>Owner</TableHead>
							<TableHead>Team</TableHead>
							<TableHead>Budget</TableHead>
							<TableHead>Timeline</TableHead>
							<TableHead className="min-w-[280px]">Goal</TableHead>
							<TableHead>Created</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{filteredProjects.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="h-40 text-center">
									<div>
										<p className="font-medium text-[#191C1D] dark:text-white">
											No projects yet
										</p>
										<p className="mt-1 text-sm text-muted-foreground">
											Add a new project to see submitted form data here.
										</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							filteredProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className="px-4">
										<div className="font-medium text-[#191C1D] dark:text-white">
											{project.company}
										</div>
										<div className="mt-1 text-xs text-muted-foreground">
											{project.email}
										</div>
									</TableCell>
									<TableCell>
										{project.firstName} {project.lastName}
									</TableCell>
									<TableCell>{project.teamSize}</TableCell>
									<TableCell>{formatOption(project.budget)}</TableCell>
									<TableCell>{formatOption(project.timeline)}</TableCell>
									<TableCell className="max-w-[360px] whitespace-normal leading-6 text-[#374151] dark:text-zinc-200">
										{project.goal}
									</TableCell>
									<TableCell>{project.createdAt}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}

function ProjectFormDrawer({
	open,
	onOpenChange,
	onSubmit,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (values: LeadFormValues) => void;
}) {
	const [stepIndex, setStepIndex] = React.useState(0);
	const { draft, setDraft, clearDraft } = useLeadFormStore();

	const form = useForm<LeadFormValues>({
		defaultValues: draft,
		mode: "onTouched",
	});

	const watchedValues = useWatch({ control: form.control });
	const currentStep = steps[stepIndex];
	const isLastStep = stepIndex === steps.length - 1;

	React.useEffect(() => {
		if (!open) return;

		const nextDraft = {
			...emptyLeadFormValues,
			...watchedValues,
		};
		const currentDraft = useLeadFormStore.getState().draft;

		if (!areLeadValuesEqual(nextDraft, currentDraft)) {
			setDraft(nextDraft);
		}
	}, [open, setDraft, watchedValues]);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			setDraft(form.getValues());
		} else {
			form.reset(useLeadFormStore.getState().draft);
		}

		onOpenChange(nextOpen);
	};

	const validateFields = (fields: Array<keyof LeadFormValues>) => {
		const values = form.getValues();
		const shape = leadFormSchema.shape;
		let isValid = true;

		fields.forEach((field) => form.clearErrors(field));
		fields.forEach((field) => {
			const result = shape[field].safeParse(values[field]);

			if (!result.success) {
				isValid = false;
				form.setError(field, {
					type: "manual",
					message: result.error.issues[0]?.message ?? "This field is invalid.",
				});
			}
		});

		return isValid;
	};

	const goNext = () => {
		if (validateFields(currentStep.fields)) {
			setStepIndex((current) => Math.min(current + 1, steps.length - 1));
		}
	};

	const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		goNext();
	};

	const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setStepIndex((current) => Math.max(current - 1, 0));
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		if (!isLastStep) {
			event.preventDefault();
			goNext();
			return;
		}

		event.preventDefault();
		const result = leadFormSchema.safeParse(form.getValues());

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const field = issue.path[0] as keyof LeadFormValues | undefined;
				if (field) {
					form.setError(field, {
						type: "manual",
						message: issue.message,
					});
				}
			});
			return;
		}

		onSubmit(result.data);
		clearDraft();
		form.reset(emptyLeadFormValues);
		setStepIndex(0);
	};

	return (
		<Drawer direction="right" open={open} onOpenChange={handleOpenChange}>
			<DrawerContent className="w-[min(480px,94vw)]">
				<DrawerHeader className="border-b px-5 py-5 text-left">
					<DrawerTitle>{currentStep.title}</DrawerTitle>
					<DrawerDescription>{currentStep.description}</DrawerDescription>
				</DrawerHeader>

				<div className="border-b px-5 py-4">
					<div className="grid grid-cols-3 gap-2">
						{steps.map((step, index) => (
							<div
								key={step.title}
								className={cn(
									"h-2 rounded-full bg-[#D6DADD] dark:bg-white/15",
									index <= stepIndex && "bg-black dark:bg-white",
								)}
							/>
						))}
					</div>
				</div>

				<form
					onSubmit={handleFormSubmit}
					className="flex min-h-0 flex-1 flex-col"
				>
					<div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
						{stepIndex === 0 && <ContactStep form={form} />}
						{stepIndex === 1 && <CompanyStep form={form} />}
						{stepIndex === 2 && <ProjectStep form={form} />}
					</div>

					<DrawerFooter className="border-t px-5 py-5 sm:flex-row">
						<Button
							type="button"
							variant="outline"
							onClick={handleBackClick}
							disabled={stepIndex === 0}
							className="gap-2 sm:flex-1"
						>
							<ArrowLeft className="size-4" />
							Back
						</Button>
						{isLastStep ? (
							<Button type="submit" className="gap-2 sm:flex-1">
								<Send className="size-4" />
								Submit
							</Button>
						) : (
							<Button
								type="button"
								onClick={handleNextClick}
								className="gap-2 sm:flex-1"
							>
								Next
								<ArrowRight className="size-4" />
							</Button>
						)}
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
}

function ContactStep({
	form,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
}) {
	return (
		<FieldGroup>
			<div className="grid gap-4 sm:grid-cols-2">
				<TextField form={form} name="firstName" label="First name" />
				<TextField form={form} name="lastName" label="Last name" />
			</div>
			<TextField form={form} name="email" label="Email" type="email" />
		</FieldGroup>
	);
}

function CompanyStep({
	form,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
}) {
	return (
		<FieldGroup>
			<TextField form={form} name="company" label="Company" />
			<SelectField
				form={form}
				name="teamSize"
				label="Team size"
				options={[
					{ value: "1-10", label: "1-10 people" },
					{ value: "11-50", label: "11-50 people" },
					{ value: "51-200", label: "51-200 people" },
					{ value: "201+", label: "201+ people" },
				]}
			/>
		</FieldGroup>
	);
}

function ProjectStep({
	form,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
}) {
	const goalError = form.formState.errors.goal;

	return (
		<FieldGroup>
			<Field data-invalid={Boolean(goalError)}>
				<FieldLabel htmlFor="goal">Project goal</FieldLabel>
				<textarea
					id="goal"
					rows={5}
					aria-invalid={Boolean(goalError)}
					className="min-h-28 w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
					placeholder="What problem should this help your team solve?"
					{...form.register("goal")}
				/>
				<FieldDescription>
					A short paragraph is enough for the project request.
				</FieldDescription>
				<FieldError errors={[goalError]} />
			</Field>
			<SelectField
				form={form}
				name="budget"
				label="Budget"
				options={[
					{ value: "under-5k", label: "Under $5k" },
					{ value: "5k-15k", label: "$5k-$15k" },
					{ value: "15k-50k", label: "$15k-$50k" },
					{ value: "50k-plus", label: "$50k+" },
				]}
			/>
			<SelectField
				form={form}
				name="timeline"
				label="Timeline"
				options={[
					{ value: "this-month", label: "This month" },
					{ value: "next-quarter", label: "Next quarter" },
					{ value: "exploring", label: "Still exploring" },
				]}
			/>
		</FieldGroup>
	);
}

function TextField({
	form,
	name,
	label,
	type = "text",
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
	name: keyof LeadFormValues;
	label: string;
	type?: React.HTMLInputTypeAttribute;
}) {
	const error = form.formState.errors[name];

	return (
		<Field data-invalid={Boolean(error)}>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Input
				id={name}
				type={type}
				aria-invalid={Boolean(error)}
				{...form.register(name)}
			/>
			<FieldError errors={[error]} />
		</Field>
	);
}

function SelectField({
	form,
	name,
	label,
	options,
}: {
	form: ReturnType<typeof useForm<LeadFormValues>>;
	name: keyof LeadFormValues;
	label: string;
	options: Array<{ value: string; label: string }>;
}) {
	const error = form.formState.errors[name];

	return (
		<Field data-invalid={Boolean(error)}>
			<FieldLabel>{label}</FieldLabel>
			<Controller
				control={form.control}
				name={name}
				render={({ field }) => (
					<Select value={field.value} onValueChange={field.onChange}>
						<SelectTrigger className="w-full" aria-invalid={Boolean(error)}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent position="popper" align="start" className="z-[90]">
							{options.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			<FieldError errors={[error]} />
		</Field>
	);
}

function formatOption(value: string) {
	const labels: Record<string, string> = {
		"under-5k": "Under $5k",
		"5k-15k": "$5k-$15k",
		"15k-50k": "$15k-$50k",
		"50k-plus": "$50k+",
		"this-month": "This month",
		"next-quarter": "Next quarter",
		exploring: "Still exploring",
	};

	return labels[value] ?? value;
}

function areLeadValuesEqual(first: LeadFormValues, second: LeadFormValues) {
	return (
		first.firstName === second.firstName &&
		first.lastName === second.lastName &&
		first.email === second.email &&
		first.company === second.company &&
		first.teamSize === second.teamSize &&
		first.goal === second.goal &&
		first.budget === second.budget &&
		first.timeline === second.timeline
	);
}
