import {
  BadgeCheck,
  Code2,
  Copy,
  ListTree,
  Plug,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolNotes from "@/components/tools/ToolNotes";
import ApiMockBuilder from "./ApiMockBuilder";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Full Request Shape",
    description: "Set method, status code, headers, and body in one place.",
    icon: Plug,
  },
  {
    title: "Curl Snippet",
    description:
      "Copy a ready-to-run curl command matching your configuration.",
    icon: Code2,
  },
  {
    title: "Fetch Snippet",
    description: "Get the equivalent JavaScript fetch call for the frontend.",
    icon: ListTree,
  },
  {
    title: "Status Codes",
    description:
      "Model success, redirect, client error, and server error responses.",
    icon: BadgeCheck,
  },
  {
    title: "Header Control",
    description:
      "Add arbitrary headers to mirror the contract you are targeting.",
    icon: Copy,
  },
  {
    title: "No Server Needed",
    description:
      "Everything is generated locally — nothing is deployed or hosted.",
    icon: ShieldCheck,
  },
];

const WHY_MOCK: { title: string; body: string }[] = [
  {
    title: "Frontend Before Backend",
    body: "Build and test your UI against realistic data shapes before the real API endpoint is ready. No more blocked sprints.",
  },
  {
    title: "Reproduce Edge Cases",
    body: "Simulate 401 Unauthorized, 404 Not Found, or 500 Server Error responses to validate your error-handling logic every time.",
  },
  {
    title: "Faster TDD Cycles",
    body: "Write tests against a predictable mock contract rather than a live, flaky service. Faster feedback, fewer flaky tests.",
  },
  {
    title: "Demo Without a Server",
    body: "Present a working prototype to stakeholders using mocked endpoints — no backend deployment required.",
  },
  {
    title: "Offline Development",
    body: "Keep coding on planes and coffee shops. Mocked APIs never go down, rate-limit, or require VPN access.",
  },
  {
    title: "Share Reproducible Bugs",
    body: "Paste a curl or fetch snippet from this tool into a bug report to give teammates an exact reproduction step.",
  },
];

export default function ApiMockBuilderPage() {
  return (
    <ToolPage
      id="api-mock-builder"
      heading="API Mock Builder."
      intro="Configure HTTP method, status code, headers, and response body — get curl and fetch snippets instantly."
      extra={
        <>
          <ToolNotes
            heading="Why mock an API?"
            description="What a mock endpoint unblocks while the real service is still being built."
            notes={WHY_MOCK}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Design a response contract and walk away with the exact curl and fetch calls to reproduce it."
      faqs={FAQS}
      faqTitle="API Mock Builder FAQ."
    >
      <ApiMockBuilder />
    </ToolPage>
  );
}
