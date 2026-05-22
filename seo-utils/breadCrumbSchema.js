export const breadCrumbSchema = (name, host, url) => {
  const urlName = url ? url.split("/") : "";
  const itemListElements = [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": host,
        name: "Home",
      },
    },
  ];

  for (let i = 3; i < urlName.length; i++) {
    if (urlName[i]) {
      const isLast = i === urlName.length - 1;
      itemListElements.push({
        "@type": "ListItem",
        position: i - 1,
        item: {
          "@id": `${host}/${urlName.slice(3, i + 1).join("/")}`,
          name: isLast ? name : urlName[i], // use readable name for last segment
        },
      });
    }
  }

  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElements,
  });
};
