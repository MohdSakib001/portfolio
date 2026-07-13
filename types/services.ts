export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  primaryCta: string;
  secondaryCta: string;
  /** Structured-data overrides (optional — sensible fallbacks applied in ServicePageShell). */
  serviceName?: string;
  serviceType?: string;
  areaServed?: string[];
  /** mailto subject used by the ServiceLanding CTA. */
  inquirySubject?: string;
  proof: {
    value: string;
    label: string;
  }[];
  services: {
    title: string;
    description: string;
  }[];
  outcomes: string[];
  stack: string[];
  projectIds: string[];
  process: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};
