import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { ProjectsTable, type Project } from "@/components/platform/ProjectsTable";
import type { LeadFormValues } from "@/components/forms/multistep-drawer/schema";
import { fetchProjects } from "@/lib/services/fetchProjects";

export default function ProjectsPage() {
	const [localProjects, setLocalProjects] = React.useState<Project[]>([]);
	const projectsQuery = useQuery({
		queryKey: ["projects"],
		queryFn: fetchProjects,
	});

	const projects = [...localProjects, ...(projectsQuery.data ?? [])];

	function addProject(values: LeadFormValues) {
		setLocalProjects((currentProjects) => [
			{
				...values,
				id: `project-${Date.now()}`,
				createdAt: new Date().toLocaleDateString("en", {
					month: "short",
					day: "numeric",
					year: "numeric",
				}),
			},
			...currentProjects,
		]);
	}

	return (
		<div className="space-y-3">
			{projectsQuery.isPending ? (
				<p className="text-sm text-muted-foreground">Loading demo projects...</p>
			) : null}
			{projectsQuery.error ? (
				<p className="text-sm text-red-600 dark:text-red-300">
					{projectsQuery.error.message}
				</p>
			) : null}
			<ProjectsTable projects={projects} onCreate={addProject} />
		</div>
	);
}
