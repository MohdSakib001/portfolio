import {
  Briefcase,
  Download,
  Eye,
  FileCheck2,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import ResumeBuilder from "./ResumeBuilder";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Live Preview",
    description:
      "See the print-quality document update as you fill in each field.",
    icon: Briefcase,
  },
  {
    title: "ATS-Friendly",
    description:
      "A clean single-column structure that parsers can actually read.",
    icon: Eye,
  },
  {
    title: "Full Sections",
    description: "Experience, education, skills, and projects all covered.",
    icon: FileCheck2,
  },
  {
    title: "Print Quality",
    description:
      "Layout is built for A4 and Letter output, not just the screen.",
    icon: LayoutTemplate,
  },
  {
    title: "PDF Download",
    description: "Export the finished resume without a watermark or paywall.",
    icon: Download,
  },
  {
    title: "Nothing Stored",
    description: "Your employment history never leaves the browser.",
    icon: ShieldCheck,
  },
];

const ATS_TIPS: { title: string; body: string }[] = [
  {
    title: "Use Standard Section Headings",
    body: "ATS systems look for keywords like 'Work Experience', 'Education', and 'Skills'. Avoid creative labels like 'My Journey' or 'What I Know'.",
  },
  {
    title: "Mirror the Job Description",
    body: "Identify keywords in the job posting (languages, tools, soft skills) and use the exact same phrasing in your resume. ATS scores are heavily keyword-driven.",
  },
  {
    title: "Quantify Everything You Can",
    body: "Numbers stand out both to ATS and human readers. Instead of 'improved performance', write 'reduced load time by 35%'. Use percentages, dollar amounts, and user counts.",
  },
  {
    title: "Keep Formatting Clean",
    body: "Avoid multi-column layouts, text boxes, graphics, and tables for structure. Single-column, left-to-right text is the safest format for ATS parsing.",
  },
];

export default function ResumeBuilderPage() {
  return (
    <ToolPage
      id="resume-builder"
      heading="Resume / CV Builder."
      intro="Build a resume with a live preview, watch the print-quality document update as you type, and download as PDF."
      extra={
        <>
          <ToolNotes
            heading="ATS-friendly resume tips."
            description="Over 98% of Fortune 500 companies screen resumes with an Applicant Tracking System before a human sees them. These principles help yours pass."
            notes={ATS_TIPS}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="A clean, parseable resume you own outright — no subscription, no watermark, and no copy of your history on a server."
      faqs={FAQS}
      faqTitle="Resume / CV Builder FAQ."
    >
      <ResumeBuilder />
    </ToolPage>
  );
}
