import ServiceLanding from "@/components/pages/services/page";
import { getServicePage } from "@/data/services";
import { HOST } from "@/data/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { personSchema } from "@/seo-utils/personSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";

function getRequiredServicePage() {
  const servicePage = getServicePage("hire-nextjs-developer-india");
  if (!servicePage) {
    throw new Error("Missing service page: hire-nextjs-developer-india");
  }

  return servicePage;
}

const servicePage = getRequiredServicePage();
const url = `${HOST}/${servicePage.slug}`;

export const metadata = {
  ...createMetaData({
    title: servicePage.metaTitle,
    description: servicePage.metaDescription,
    keywords: servicePage.keywords,
    url,
  }),
};

export default function HireNextjsDeveloperIndiaPage() {
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mohd Sakib - Next.js Developer India",
    url,
    image: `${HOST}/assets/me/1.png`,
    description: servicePage.metaDescription,
    areaServed: ["United States", "United Kingdom", "India", "Remote"],
    serviceType: "Next.js development, full-stack web development, SaaS development",
    provider: {
      "@type": "Person",
      name: "Mohd Sakib",
      url: HOST,
      jobTitle: "Senior Full Stack and React Native Developer",
      email: "mohdsakib.work@gmail.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Remote Next.js Development Services",
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
