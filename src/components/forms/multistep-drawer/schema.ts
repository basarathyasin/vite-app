import { z } from "zod";

export const teamSizes = ["1-5", "6-20", "21-50", "51+"] as const;
export const budgetRanges = ["under-5k", "5k-15k", "15k-30k", "30k-plus"] as const;
export const timelines = ["this-month", "next-quarter", "flexible"] as const;

export const teamSizeLabels: Record<(typeof teamSizes)[number], string> = {
	"1-5": "1-5 people",
	"6-20": "6-20 people",
	"21-50": "21-50 people",
	"51+": "51+ people",
};

export const budgetLabels: Record<(typeof budgetRanges)[number], string> = {
	"under-5k": "Under $5k",
	"5k-15k": "$5k - $15k",
	"15k-30k": "$15k - $30k",
	"30k-plus": "$30k+",
};

export const timelineLabels: Record<(typeof timelines)[number], string> = {
	"this-month": "This month",
	"next-quarter": "Next quarter",
	flexible: "Flexible",
};

export const multistepFormSchema = z.object({
	firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
	lastName: z.string().trim().min(2, "Last name must be at least 2 characters."),
	email: z.string().trim().email("Enter a valid email address."),
	company: z.string().trim().min(2, "Company must be at least 2 characters."),
	role: z.string().trim().min(2, "Role must be at least 2 characters."),
	teamSize: z.enum(teamSizes, { error: "Choose a team size." }),
	budget: z.enum(budgetRanges, { error: "Choose a budget range." }),
	timeline: z.enum(timelines, { error: "Choose a timeline." }),
	goal: z.string().trim().min(12, "Share a little more about the project goal."),
});

export type MultistepFormValues = z.infer<typeof multistepFormSchema>;

export const defaultMultistepValues: MultistepFormValues = {
	firstName: "",
	lastName: "",
	email: "",
	company: "",
	role: "",
	teamSize: "1-5",
	budget: "under-5k",
	timeline: "flexible",
	goal: "",
};

export const stepFieldNames = [
	["firstName", "lastName", "email"],
	["company", "role", "teamSize", "budget"],
	["timeline", "goal"],
] as const satisfies readonly (readonly (keyof MultistepFormValues)[])[];
