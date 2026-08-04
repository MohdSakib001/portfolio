import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "Is this resume builder completely free?",
    answer:
      "Yes, it is 100% free with no account required, no watermarks, and no usage limits. All processing happens directly in your browser — your resume data is never sent to any server. It is saved locally in your browser's localStorage so your work persists between sessions.",
  },
  {
    question: "How do I download my resume as a PDF?",
    answer:
      "Click the 'Download PDF' button at the bottom of the form. Your browser's native print dialog will open. Select 'Save as PDF' as the destination (available in Chrome, Firefox, Safari, and Edge). The print view automatically hides the form and shows only your clean resume document.",
  },
  {
    question: "Is the resume ATS-friendly?",
    answer:
      "Yes. The preview uses clean, semantic HTML with standard section headings (Work Experience, Education, Skills, Certifications) that Applicant Tracking Systems can parse reliably. Avoid graphics, tables for layout, or unusual fonts when targeting ATS-heavy roles — this tool's structure follows best practices for automated parsing.",
  },
  {
    question: "What sections should every resume include?",
    answer:
      "A strong resume should always include: (1) Contact information with name, email, phone, and location; (2) A professional summary tailored to the role; (3) Work experience in reverse-chronological order with bullet points that quantify achievements; (4) Education with degree and institution; and (5) Relevant skills. Certifications are optional but valuable for technical and regulated industries.",
  },
  {
    question: "How do I write strong resume bullet points?",
    answer:
      "Use the CAR formula: Context, Action, Result. Start each bullet with a strong action verb (Led, Designed, Reduced, Increased, Implemented) and quantify the outcome where possible. For example: 'Reduced API latency by 42% through Redis caching, improving page load time for 200,000 daily active users.' Specific numbers make your bullets far more compelling.",
  },
  {
    question: "Will my resume data be saved if I close the browser?",
    answer:
      "Yes. The tool automatically saves your resume to your browser's localStorage as you type. When you return to the page, your data will be restored automatically. Use the 'Clear / Start Over' button only when you want to discard your current resume and begin a new one.",
  },
];
