interface Service {
  id: number;
  name: string;
  price: string;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">
        {service.name}
      </h2>

      <p className="mb-4 text-muted-foreground">
        Starting at {service.price}
      </p>

      <a
        href={`/services/${service.id}`}
        className="inline-flex rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        View Details
      </a>
    </div>
  );
}
