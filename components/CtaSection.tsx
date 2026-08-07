import { ArrowRight, type LucideIcon } from "lucide-react";

export type CtaPill = {
  icon: LucideIcon;
  label: string;
};

type CtaSectionProps = {
  title: string;
  /** Mailto or route the primary button points at. */
  href: string;
  cta: string;
  eyebrow?: string;
  description?: string;
  /** Supporting chips rendered under the title, e.g. availability signals. */
  pills?: CtaPill[];
  className?: string;
};

/** Black closing panel used to end a page on a single action. */
export default function CtaSection({
  title,
  href,
  cta,
  eyebrow,
  description,
  pills,
  className = "px-4 py-10 sm:px-6 md:px-10 lg:mx-auto lg:max-w-6xl lg:px-16",
}: CtaSectionProps) {
  return (
    <section className={className}>
      <div className="relative overflow-hidden rounded-4xl bg-black p-8 text-white md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            {eyebrow && (
              <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-white/35">
                {eyebrow}
              </p>
            )}
            <h2 className="max-w-3xl text-heading font-semibold leading-none tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-5 max-w-xl text-caption leading-relaxed text-white/55">
                {description}
              </p>
            )}
            {pills && pills.length > 0 && (
              <div className="mt-5 hidden flex-wrap gap-3 text-caption text-white/55 lg:flex">
                {pills.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"
                  >
                    <Icon size={15} />
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <a
            href={href}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-label font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-neutral-200"
          >
            {cta}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
