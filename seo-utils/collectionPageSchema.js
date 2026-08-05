import { HOST } from "@/data/constants";

/**
 * CollectionPage JSON-LD for an index that lists standalone web apps. Each
 * entry becomes a `hasPart` WebApplication so the individual tools stay
 * eligible for rich results when crawled from the listing page.
 *
 * `items` is expected to come straight from `data/tools.ts` — the tool records
 * are the single source of truth, this only reshapes them for schema.org.
 */
export function collectionPageSchema({ name, description, url, items }) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    name,
    description,
    url,
    author: {
      "@type": "Person",
      "@id": `${HOST}/#person`,
      name: "Mohd Sakib",
      url: HOST,
    },
    hasPart: items.map((item) => ({
      "@type": "WebApplication",
      name: item.name,
      description: item.description,
      url: `${HOST}/tools/${item.id}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  });
}
