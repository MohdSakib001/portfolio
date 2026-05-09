const stats = [
  { label: "Users Served", value: "25K+" },
  { label: "GMV Shipped", value: "$100K+" },
  { label: "Lighthouse Score", value: "98" },
  { label: "Production Systems", value: "8" },
];

export default function ProofStrip() {
  return (
    <section className="border-y border-neutral-200 py-12 sm:py-16 px-6 sm:px-10 md:px-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-10 max-w-7xl mx-auto">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col gap-2 items-center">
            <span className="text-heading font-semibold tracking-tight leading-none">
              {s.value}
            </span>
            <span className="text-label uppercase tracking-[0.2em] opacity-35 font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
