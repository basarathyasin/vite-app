/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { services } from ".";

export const Route = createFileRoute("/services/$serviceId")({
  component: RouteComponent,

  loader: async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const id = Number(params.serviceId);

    if (Number.isNaN(id)) {
      throw new Error("Invalid Service ID");
    }

    const service = services.find(
      (service) => service.id === id
    );

    if (!service) {
      throw new Error("Service Not Found");
    }

    return service;
  },

  pendingComponent: () => (
    <h1 className="flex justify-center">
      Loading Service...
    </h1>
  ),

  errorComponent: ({ error }) => (
    <div className="flex flex-col items-center p-2">
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  ),
});

function RouteComponent() {
  const service = Route.useLoaderData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {service.name}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {service.price}
      </p>
    </div>
  );
}