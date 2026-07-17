import { gql } from "@apollo/client";

import type { Project } from "@/components/platform/ProjectsTable";
import { apolloClient } from "@/lib/apolloClient";

const GET_PROJECTS = gql`
	query Projects {
		projects {
			documentId
			firstName
			lastName
			email
			companySize
			company
			budget
			projectGoal
			teamSize
			timeline
			createdAt
		}
	}
`;

type ProjectsResponse = {
	projects: Array<
		Omit<Project, "id" | "goal"> & {
			documentId: string;
			companySize?: string | null;
			projectGoal: string;
		}
	>;
};

export async function fetchProjects(): Promise<Project[]> {
	const { data } = await apolloClient.query<ProjectsResponse>({
		query: GET_PROJECTS,
		fetchPolicy: "network-only",
	});

	return (
		data?.projects.map((project) => ({
			id: project.documentId,
			firstName: project.firstName,
			lastName: project.lastName,
			email: project.email,
			company: project.company,
			teamSize: project.teamSize || project.companySize || "1-10",
			goal: project.projectGoal,
			budget: project.budget,
			timeline: project.timeline,
			createdAt: project.createdAt,
			role: project.role ?? "",
		})) ?? []
	);
}
