import { z } from "zod";

export const leadFormSchema = z.object({
	firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
	lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
	email: z.string().trim().email("Enter a valid email address"),
	company: z.string().trim().min(2, "Company name is required"),
	role: z.string().trim(),
	teamSize: z.enum(["1-10", "11-50", "51-200", "201+"]),
	goal: z.string().trim().min(10, "Tell us a little more about the goal"),
	budget: z.enum(["under-5k", "5k-15k", "15k-50k", "50k-plus"]),
	timeline: z.enum(["this-month", "next-quarter", "exploring"]),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const emptyLeadFormValues: LeadFormValues = {
	firstName: "",
	lastName: "",
	email: "",
	company: "",
	role: "",
	teamSize: "1-10",
	goal: "",
	budget: "5k-15k",
	timeline: "next-quarter",
};

export const teamSizes = ["1-10", "11-50", "51-200", "201+"] as const;
export const budgetRanges = [
	"under-5k",
	"5k-15k",
	"15k-50k",
	"50k-plus",
] as const;
export const timelines = [
	"this-month",
	"next-quarter",
	"exploring",
] as const;

export const teamSizeLabels: Record<(typeof teamSizes)[number], string> = {
	"1-10": "1-10 people",
	"11-50": "11-50 people",
	"51-200": "51-200 people",
	"201+": "201+ people",
};

export const budgetLabels: Record<(typeof budgetRanges)[number], string> = {
	"under-5k": "Under $5k",
	"5k-15k": "$5k-$15k",
	"15k-50k": "$15k-$50k",
	"50k-plus": "$50k+",
};

export const timelineLabels: Record<(typeof timelines)[number], string> = {
	"this-month": "This month",
	"next-quarter": "Next quarter",
	exploring: "Still exploring",
};

export const multistepFormSchema = leadFormSchema;
export type MultistepFormValues = LeadFormValues;
export const defaultMultistepValues = emptyLeadFormValues;

export const stepFieldNames = [
	["firstName", "lastName", "email"],
	["company", "role", "teamSize"],
	["goal", "budget", "timeline"],
] as const satisfies readonly (readonly (keyof LeadFormValues)[])[];
