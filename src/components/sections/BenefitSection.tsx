const stats = [
  {
    value: "99.9%",
    label: "UPTIME SLA",
  },
  {
    value: "250ms",
    label: "AVG LATENCY",
  },
  {
    value: "10x",
    label: "FASTER DEPLOYS",
  },
  {
    value: "30%",
    label: "COST SAVINGS",
  },
];

export default function BenefitsSection() {
  return (
    <section id="about" className="scroll-mt-24 px-6 pt-20 md:px-12">
      <div className="mx-auto max-w-[1184px]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-4 text-center"
            >
              <h4 className="font-heading text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-black">
                {stat.value}
              </h4>

              <p className=" text-[12px] font-medium uppercase tracking-[1.4px] text-[#585F6C]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
