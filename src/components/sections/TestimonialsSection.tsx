import { TestimonialCard } from "@/components/ui/card/TestimonialCard";

const testimonials = [
  {
    quote:
      "Premium didn't just speed up our deployment cycle; it changed how we think about scale. The abstraction layer is perfect.",
    name: "Alex Rivera",
    role: "CTO, HyperStream",
    avatar: "/pl2.jpeg",
  },
  {
    quote:
      "The security features alone saved us six months of compliance prep. It's truly enterprise-ready from day one.",
    name: "Sarah Chen",
    role: "Founder, Vaulted",
    avatar: "/pl1.jpeg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-6 pt-40 md:px-12">
      <div className="mx-auto max-w-[1184px]">
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
