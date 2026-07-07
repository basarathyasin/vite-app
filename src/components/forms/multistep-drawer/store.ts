import { create } from "zustand";

import {
	defaultMultistepValues,
	type MultistepFormValues,
} from "@/components/forms/multistep-drawer/schema";

export type ProjectSubmission = MultistepFormValues & {
	id: string;
	createdAt: string;
};

type MultistepDraftState = {
	draft: MultistepFormValues;
	submitted: MultistepFormValues | null;
	projects: ProjectSubmission[];
	updateDraft: (values: MultistepFormValues) => void;
	clearDraft: () => void;
	saveSubmitted: (values: MultistepFormValues) => void;
	saveProject: (values: MultistepFormValues) => void;
};

export const useMultistepDraftStore = create<MultistepDraftState>((set) => ({
	draft: defaultMultistepValues,
	submitted: null,
	projects: [],
	updateDraft: (values) => set({ draft: values }),
	clearDraft: () => set({ draft: defaultMultistepValues }),
	saveSubmitted: (values) =>
		set((state) => ({
			submitted: values,
			projects: [
				...state.projects,
				{
					...values,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
				},
			],
			draft: defaultMultistepValues,
		})),
	saveProject: (values) =>
		set((state) => ({
			submitted: values,
			projects: [
				...state.projects,
				{
					...values,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
				},
			],
			draft: defaultMultistepValues,
		})),
}));
