export const profilePageSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      "@id": "https://mohdsakib.vercel.app/#person",
      name: "Mohd Sakib",
      alternateName: "Mohammad Sakib",
      identifier: "mohdsakib001",
      description:
        "Senior Full Stack Developer and React Native specialist. Architected 8 production-grade products across FinTech, EdTech, LegalTech, Gaming, and AI — serving 25,000+ users and processing $100K+ in transactions.",
      image: {
        "@type": "ImageObject",
        url: "https://mohdsakib.vercel.app/assets/me/1.png",
        width: 420,
        height: 560,
      },
      jobTitle: "Senior Full Stack Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance / Open to Opportunities",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Meerut",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/mohdsakib-Krapton",
        "https://www.linkedin.com/in/mohdsakib001",
        "https://twitter.com/mohdsakib001",
      ],
    },
  });
};
