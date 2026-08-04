import type { ElementType, ReactNode } from "react";

import Container from "@/components/Container";
import Faq, { type FaqItem } from "@/components/Faq";
import GridSection from "@/components/GridSection";
import ToolSection from "@/components/tools/ToolSection";
import { getRelatedTools } from "@/data/tools";

export type ToolFeature = {
  title: string;
  description: string;
  icon?: ElementType;
  color?: string;
};

/** Rotation borrowed from the homepage architecture grid. */
export const FEATURE_COLORS = [
  "bg-emerald-300/70",
  "bg-purple-300/70",
  "bg-sky-300/70",
  "bg-amber-300/70",
  "bg-rose-300/70",
  "bg-indigo-300/70",
];

type ToolPageProps = {
  /** Tool id from `data/tools.ts` — drives the related-tools rail. */
  id: string;
  /** Headline, written with the trailing period the portfolio uses. */
  heading: string;
  intro: string;
  /** The interactive widget. */
  children: ReactNode;
  explainer?: { heading: string; paragraphs: string[] };
  /** Bespoke sections rendered between the explainer and the feature grid. */
  extra?: ReactNode;
  features?: ToolFeature[];
  featuresTopic?: string;
  featuresTitle?: string;
  featuresDescription?: string;
  faqs: FaqItem[];
  faqTitle?: string;
};

export default function ToolPage({
  id,
  heading,
  intro,
  children,
  explainer,
  extra,
  features,
  featuresTopic = "Capabilities",
  featuresTitle = "What You Get",
  featuresDescription,
  faqs,
  faqTitle = "Frequently Asked Questions.",
}: ToolPageProps) {
  const relatedTools = getRelatedTools(id);

  return (
    <main className="min-h-screen bg-white text-black">
      <Container className="pb-12 pt-36">
        <h1 className="max-w-3xl text-heading font-semibold leading-none tracking-tight">
          {heading}
        </h1>
        <p className="mt-4 max-w-xl text-body leading-relaxed text-black/50">
          {intro}
        </p>

        <div className="mt-12">{children}</div>
      </Container>

      {explainer && (
        <Container className="py-12">
          <h2 className="text-title font-semibold tracking-tight">
            {explainer.heading}
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-body leading-relaxed text-black/55">
            {explainer.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      )}

      {extra}

      {features && features.length > 0 && featuresDescription && (
        <GridSection
          topic={featuresTopic}
          title={featuresTitle}
          description={featuresDescription}
          cards={features.map((feature, index) => ({
            ...feature,
            color: feature.color ?? FEATURE_COLORS[index % FEATURE_COLORS.length],
          }))}
        />
      )}

      <ToolSection
        tools={relatedTools}
        description="More free browser-based utilities, connected by category and use case."
      />

      <Faq faqs={faqs} title={faqTitle} defaultOpenIndex={0} />
    </main>
  );
}
