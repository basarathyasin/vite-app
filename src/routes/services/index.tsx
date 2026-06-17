/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import ServiceCard from "@/components/ui/ServiceCard";

export const services = [
	{
		id: 1,
		name: "Web Development",
		price: "$999",
	},
	{
		id: 2,
		name: "UI/UX Design",
		price: "$499",
	},
	{
		id: 3,
		name: "SEO Optimization",
		price: "$299",
	},
	{
		id: 4,
		name: "Digital Marketing",
		price: "$399",
	},
];

export interface Service {
	id: number;
	name: string;
	price: string;
}

export const Route = createFileRoute("/services/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex border min-h-[30vh] justify-center items-center gap-12 md:grid-cols-4 lg:grid-cols-4">
			{services.map((service) => (
				<ServiceCard key={service.id} service={service} />
			))}
		</div>
	);
}
