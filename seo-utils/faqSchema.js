export const faqsData = [
  {
    question: "What technologies does Mohd Sakib specialize in for Full Stack Development?",
    answer: "I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js), Next.js for server-rendered web applications, and React Native for cross-platform mobile apps. My toolkit also includes modern libraries like GSAP and Framer Motion for high-impact UI animations, alongside Tailwind CSS for robust styling."
  },
  {
    question: "Do you build both web applications and mobile applications?",
    answer: "Yes! I provide end-to-end development for both platforms. I use React.js and Next.js for responsive, fast, high-conversion web platforms, and React Native to deliver iOS and Android applications with native-like performance."
  },
  {
    question: "How do you ensure your web applications are fast and SEO friendly?",
    answer: "I prioritize Core Web Vitals from day one. By leveraging Next.js Server Components, progressive loading paradigms, optimized asset delivery, kinetic typography, and structured JSON-LD data architectures, I ensure your application ranks highly on Google and loads near-instantly."
  },
  {
    question: "Can you design user interfaces or strictly handle coding?",
    answer: "While my core expertise is full-stack coding, I deeply understand complex UI/UX principles. I architect pixel-perfect frontends translating sophisticated creative designs into fluid, interactive React experiences that captivate users and boost conversion rates."
  },
  {
    question: "What is your approach to project timelines and communication?",
    answer: "I follow an agile methodology focusing on transparency and rapid delivery. We start with a clear architectural roadmap, followed by systematic sprint-based milestones. This ensures you are constantly informed, and the digital product scales exactly according to commercial needs."
  }
];

export const faqSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
};
