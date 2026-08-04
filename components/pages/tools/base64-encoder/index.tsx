import {
  ArrowLeftRight,
  Copy,
  FileCode,
  Languages,
  Link2,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import Base64Encoder from "./Base64Encoder";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Encode And Decode",
    description: "Convert to Base64 and back without switching tools or modes.",
    icon: FileCode,
  },
  {
    title: "URL Encoding",
    description:
      "percent-encode and decode query strings alongside Base64 in one place.",
    icon: ArrowLeftRight,
  },
  {
    title: "Unicode Safe",
    description:
      "Handles multi-byte characters and emoji rather than mangling them.",
    icon: Link2,
  },
  {
    title: "Instant Output",
    description:
      "Results appear as you type, with invalid input reported clearly.",
    icon: Languages,
  },
  {
    title: "One-Click Copy",
    description: "Send the transformed output straight to your clipboard.",
    icon: Copy,
  },
  {
    title: "Never Transmitted",
    description:
      "Safe for tokens, credentials, and payloads — nothing leaves the browser.",
    icon: ShieldCheck,
  },
];

export default function Base64EncoderPage() {
  return (
    <ToolPage
      id="base64-encoder"
      heading="Base64 Encoder / Decoder."
      intro="Base64 encode and decode, plus URL encode and decode — browser-only, nothing sent anywhere."
      features={FEATURES}
      featuresDescription="Four transforms over one field, with Unicode handled correctly and no payload ever leaving the tab."
      faqs={FAQS}
      faqTitle="Base64 Encoder / Decoder FAQ."
    >
      <Base64Encoder />
    </ToolPage>
  );
}
