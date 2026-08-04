import {
  Copy,
  Gauge,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sliders,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import PasswordGenerator from "./PasswordGenerator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Crypto-Grade Random",
    description: "Uses the Web Crypto API, not the predictable Math.random.",
    icon: Lock,
  },
  {
    title: "8 To 128 Characters",
    description:
      "Set any length, from a short PIN to a full passphrase-length key.",
    icon: Sliders,
  },
  {
    title: "Character Toggles",
    description:
      "Switch uppercase, lowercase, numbers, and symbols independently.",
    icon: Gauge,
  },
  {
    title: "Strength Meter",
    description: "Live feedback on how resistant the result is to brute force.",
    icon: Copy,
  },
  {
    title: "One-Click Copy",
    description:
      "Copy straight into your password manager without selecting text.",
    icon: RefreshCw,
  },
  {
    title: "Never Logged",
    description:
      "Generated passwords exist only in your tab — nothing is stored or sent.",
    icon: ShieldCheck,
  },
];

export default function PasswordGeneratorPage() {
  return (
    <ToolPage
      id="password-generator"
      heading="Password Generator."
      intro="Cryptographically secure. Nothing stored. Nothing sent."
      explainer={{
        heading: "Why you need a strong password.",
        paragraphs: [
          "Weak passwords are the most common entry point for account takeovers. Attackers use automated tools that can test billions of guesses per second against leaked password hashes. A 6-character lowercase password can be cracked in under a second. A 16-character random password with all character types would take millions of years with the same hardware.",
          "This generator uses the browser's cryptographic random number API — the same standard used by operating systems for security keys. Every password is different, truly random, and never logged.",
        ],
      }}
      features={FEATURES}
      featuresDescription="Real entropy from the Web Crypto API, with a strength read-out that reflects the character set you actually chose."
      faqs={FAQS}
      faqTitle="Password Generator FAQ."
    >
      <PasswordGenerator />
    </ToolPage>
  );
}
