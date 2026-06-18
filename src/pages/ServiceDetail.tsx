import { useParams } from "@tanstack/react-router";
import { services } from "@/data/services";
import BackButton from "@/components/ui/BackButton";

export default function ServiceDetail() {
  const { serviceId } = useParams({
    from: "/services/$serviceId",
  });

  const id = Number(serviceId);

  const service = services.find(
    (service) => service.id === id
  );

  if (!service) {
    return <div>Service Not Found</div>;
  }

  return (
    <>
    <BackButton/>
    <div className="p-6">
      
      <h1 className="text-3xl font-bold">
        {service.name}
      </h1>

      <p className="mt-2">
        {service.price}
      </p>
    </div>
    </>
  );
}