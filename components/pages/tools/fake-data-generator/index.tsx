import {
  Database,
  Download,
  FileJson,
  Hash,
  ListChecks,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import FakeDataGenerator from "./FakeDataGenerator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Realistic Records",
    description:
      "Names, emails, phone numbers, and addresses that look plausible.",
    icon: Database,
  },
  {
    title: "Pick Your Fields",
    description: "Choose exactly which columns the generated dataset contains.",
    icon: ListChecks,
  },
  {
    title: "Four Export Formats",
    description: "Output as JSON, CSV, SQL inserts, or a JavaScript array.",
    icon: FileJson,
  },
  {
    title: "UUIDs And IDs",
    description: "Generate identifiers suitable for seeding primary keys.",
    icon: Hash,
  },
  {
    title: "Bulk Rows",
    description: "Produce as many rows as your test fixture needs in one pass.",
    icon: Download,
  },
  {
    title: "No Real Data",
    description:
      "Entirely synthetic and generated locally — safe for shared repos.",
    icon: ShieldCheck,
  },
];

const USE_CASES: { title: string; body: string }[] = [
  {
    title: "Unit & Integration Testing",
    body: "Seed your test databases with realistic records. Generate hundreds of rows of diverse, believable data to exercise edge cases in your application logic without relying on production data.",
  },
  {
    title: "UI Demos & Prototypes",
    body: "Populate dashboards, tables, and admin panels with realistic-looking data for client demos or design reviews. Fake data makes prototypes feel finished and convincing.",
  },
  {
    title: "Development & Staging Environments",
    body: "Bootstrap local or staging databases instantly. Stop writing hardcoded seed files — generate the exact schema you need in seconds and paste or import it directly.",
  },
  {
    title: "Data Pipeline Testing",
    body: "Validate ETL pipelines, data transformations, and import scripts with consistent, reproducible datasets. Test your parsing logic against varied formats before touching real data.",
  },
  {
    title: "Privacy-Safe Training Data",
    body: "Create mock datasets for ML experiments or AI training that contain no real personal information. Share freely with teams without any GDPR or CCPA compliance concerns.",
  },
  {
    title: "Documentation & Tutorials",
    body: "Produce example JSON or CSV files for API documentation, blog posts, video tutorials, and code samples. Realistic fake data makes examples far more readable than 'foo/bar' placeholders.",
  },
];

export default function FakeDataGeneratorPage() {
  return (
    <ToolPage
      id="fake-data-generator"
      heading="Fake Data Generator."
      intro="Generate realistic test data — names, emails, addresses, UUIDs and more. Export as JSON, CSV, SQL, or JS."
      explainer={{
        heading: "What is a fake data generator?",
        paragraphs: [
          "A fake data generator produces synthetic but realistic-looking records — names, email addresses, phone numbers, street addresses, UUIDs, and more — without using any real personal information. Developers and QA engineers use fake data to seed test databases, populate UI prototypes, validate import pipelines, and create safe sample datasets for documentation or tutorials.",
          "This tool generates data entirely in your browser using JavaScript. Nothing is sent to a server. Select the fields you need, set the row count, pick your output format, and click Generate.",
        ],
      }}
      extra={
        <>
          <ToolNotes
            heading="What people use it for."
            description="Common jobs that need realistic records but must never touch real ones."
            notes={USE_CASES}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Synthetic records that look real enough to test with, in the export format your pipeline already expects."
      faqs={FAQS}
      faqTitle="Fake Data Generator FAQ."
    >
      <FakeDataGenerator />
    </ToolPage>
  );
}
