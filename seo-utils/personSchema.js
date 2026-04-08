export const personSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",

    name: "Mohd Sakib",
    url: "https://mohdsakib.vercel.app",

    image: "https://mohdsakib.vercel.app/assets/custom_icons/logo-full.png",

    jobTitle: "Full Stack Developer",

    description:
      "Full Stack Developer specializing in MERN stack, React.js, and React Native. Builds scalable web applications, mobile apps, and high-performance user interfaces for startups and businesses.",

    address: {
      "@type": "PostalAddress",
      addressLocality: "Meerut",
      addressRegion: "Uttar Pradesh",
      addressCountry: "India",
    },

    email: "mohdsakib.work@gmail.com",
    telephone: "+91-8800132527",

    sameAs: [
      "https://github.com/mohdsakib-Krapton",
      "https://www.linkedin.com/in/mohdsakib001",
      "https://twitter.com/mohdsakib001",
    ],

    knowsAbout: [
      "MERN Stack",
      "React.js",
      "React Native",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Firebase",
      "JavaScript",
      "Frontend Development",
      "Full Stack Development",
      "Mobile App Development",
      "REST APIs",
      "UI/UX Development",
    ],

    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      skills: ["React.js", "Node.js", "MongoDB", "Express.js", "React Native"],
    },
  });
};
