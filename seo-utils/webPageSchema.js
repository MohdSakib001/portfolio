export const webPageSchema = (title, description, url) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: title,
    url: url,
    description: description,
    inLanguage: "en-US",
    datePublished: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://mohdsakib.vercel.app/#website",
      name: "Mohd Sakib Portfolio",
      url: "https://mohdsakib.vercel.app",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://mohdsakib.vercel.app/#person",
      name: "Mohd Sakib",
      url: "https://mohdsakib.vercel.app",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://mohdsakib.vercel.app",
        },
      ],
    },
  });
};
