export function softwareApplicationSchema(project) {
  const clean = (url) => (url && url !== "#" ? url : undefined);
  // Store-only projects have no site of their own, so the listing is the URL.
  const { live, playstore, appstore } = project.links;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.tagline,
    url: clean(live) ?? clean(playstore) ?? clean(appstore),
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      "@id": "https://mohdsakib.vercel.app/#person",
      name: "Mohd Sakib",
      url: "https://mohdsakib.vercel.app",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  });
}
