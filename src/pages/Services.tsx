import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export default function Services() {
  return (
    <div>
      {/* Banner */}

      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Our Services
          </h1>

          <p className="text-lg text-slate-300">
            Explore the services we offer to help grow your
            business.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </section>
    </div>
  );
}