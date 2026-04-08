export const siteNavigationElement = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",

    name: ["Home", "Projects"],

    url: [
      "https://mohdsakib.vercel.app/",
      "https://mohdsakib.vercel.app/projects",
    ],
  });
};
