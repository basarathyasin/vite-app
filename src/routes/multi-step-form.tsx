/* eslint-disable react-refresh/only-export-components */
import { MultiStepDrawerForm } from "@/components/forms/multistep-drawer/MultiStepDrawerForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/multi-step-form")({
	component: MultiStepFormRoute,
});

function MultiStepFormRoute() {
	return <MultiStepDrawerForm />;
}
