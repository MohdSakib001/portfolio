import { ArrowRight } from "lucide-react";

import Container from "@/components/Container";
import type { FaqItem } from "@/components/Faq";

type FaqSectionProps = {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  /** Index expanded on first render. `null` keeps every entry collapsed. */
  defaultOpenIndex?: number | null;
  className?: string;
};

/**
 * Light FAQ accordion on the warm-white canvas — built on `<details>` so it
 * renders and expands without client JS. The dark homepage `Faq` stays for the
 * landing page; this is the one used across service and tool pages.
 */
export default function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Questions clients usually ask.",
  defaultOpenIndex = null,
  className = "pt-10",
}: FaqSectionProps) {
  return (
    <Container className={className}>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-3 text-label font-medium uppercase tracking-[0.25em] text-black/30">
            {eyebrow}
          </p>
          <h2 className="text-heading font-semibold leading-none tracking-tight">
            {title}
          </h2>
        </div>
        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              open={index === defaultOpenIndex}
              className="group rounded-2xl border border-black/6 bg-white p-5 shadow-[0_0_0_1px_rgba(3,3,2,0.04),0_4px_24px_rgba(3,3,2,0.05)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-tight">
                {faq.question}
                <ArrowRight
                  size={16}
                  className="shrink-0 transition group-open:rotate-90"
                />
              </summary>
              <p className="mt-4 text-caption leading-relaxed text-black/55">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Container>
  );
}
