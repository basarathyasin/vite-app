/* eslint-disable react-refresh/only-export-components */
import ProjectsPage from "@/pages/dashboard/ProjectsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/projects")({
	component: ProjectsRoutePage,
});

function ProjectsRoutePage() {
	return <ProjectsPage />;
}
