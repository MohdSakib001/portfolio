export function softwareApplicationSchema(project) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.tagline,
    url:
      project.links.live && project.links.live !== "#"
        ? project.links.live
        : undefined,
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
