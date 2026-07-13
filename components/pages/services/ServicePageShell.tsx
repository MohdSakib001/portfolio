import ServiceLanding from "@/components/pages/services/page";
import { getServicePage } from "@/data/services";
import { HOST, email } from "@/data/constants";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { personSchema } from "@/seo-utils/personSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";

type ServicePageShellProps = {
  slug: string;
};

const DEFAULT_AREA_SERVED = [
  "United States",
  "United Kingdom",
  "India",
  "Remote",
];

/**
 * Shared route shell for data-driven service / hire landing pages.
 * Each hire route renders `<ServicePageShell slug="..." />`.
 * Structured data is parameterized from the ServicePage entry (with fallbacks),
 * so every page emits correct, page-specific JSON-LD.
 */
export default function ServicePageShell({ slug }: ServicePageShellProps) {
  const servicePage = getServicePage(slug);
  if (!servicePage) {
    throw new Error(`Missing service page: ${slug}`);
  }

  const url = `${HOST}/${servicePage.slug}`;

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: servicePage.serviceName ?? servicePage.metaTitle,
    url,
    image: `${HOST}/assets/me/1.png`,
    description: servicePage.metaDescription,
    areaServed: servicePage.areaServed ?? DEFAULT_AREA_SERVED,
    serviceType:
      servicePage.serviceType ??
      "Web development, full-stack product engineering",
    provider: {
      "@type": "Person",
      name: "Mohd Sakib",
      url: HOST,
      jobTitle: "Senior Full Stack and React Native Developer",
      email,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: servicePage.serviceName ?? servicePage.metaTitle,
      itemListElement: servicePage.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicePage.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageSchema(
            servicePage.metaTitle,
            servicePage.metaDescription,
            url,
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadCrumbSchema(servicePage.metaTitle, HOST, url),
        }}
      />

      <ServiceLanding page={servicePage} />
    </>
  );
}
