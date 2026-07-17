import { create } from "zustand";

import {
	emptyLeadFormValues,
	type LeadFormValues,
} from "@/components/forms/multistep-drawer/schema";

type LeadFormStore = {
	draft: LeadFormValues;
	submitted: LeadFormValues | null;
	setDraft: (values: LeadFormValues) => void;
	updateDraft: (values: LeadFormValues) => void;
	clearDraft: () => void;
	saveSubmitted: (values: LeadFormValues) => void;
};

export const useLeadFormStore = create<LeadFormStore>((set) => ({
	draft: emptyLeadFormValues,
	submitted: null,
	setDraft: (values) => set({ draft: values }),
	updateDraft: (values) => set({ draft: values }),
	clearDraft: () => set({ draft: emptyLeadFormValues }),
	saveSubmitted: (values) =>
		set({
			submitted: values,
			draft: emptyLeadFormValues,
		}),
}));

export const useMultistepDraftStore = useLeadFormStore;
