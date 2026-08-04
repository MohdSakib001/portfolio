import {
  AlertTriangle,
  Braces,
  Clock,
  KeyRound,
  ListTree,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import JwtDecoder from "./JwtDecoder";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Header And Payload",
    description: "Both segments decoded and pretty-printed as readable JSON.",
    icon: KeyRound,
  },
  {
    title: "Expiry Check",
    description:
      "Reads exp and iat and tells you whether the token is still valid.",
    icon: Braces,
  },
  {
    title: "Claim Reference",
    description:
      "Registered RFC 7519 claims explained alongside the decoded values.",
    icon: Clock,
  },
  {
    title: "Signature Shown",
    description:
      "The third segment is displayed, so you can compare it by eye.",
    icon: ListTree,
  },
  {
    title: "Malformed Input",
    description:
      "Broken tokens report what is wrong instead of failing silently.",
    icon: AlertTriangle,
  },
  {
    title: "Never Uploaded",
    description:
      "Decoding is local — production tokens never reach a third party.",
    icon: ShieldCheck,
  },
];

const CLAIM_REFERENCE: (string | number)[][] = [
  [
    "alg",
    "Header",
    "Algorithm used to sign the token (e.g. HS256, RS256, ES256)",
  ],
  ["typ", "Header", 'Token type — always "JWT" for JSON Web Tokens'],
  ["sub", "Payload", "Subject — identifies the principal (usually a user ID)"],
  ["iss", "Payload", "Issuer — identifies the party that issued the token"],
  ["aud", "Payload", "Audience — the recipient(s) the token is intended for"],
  [
    "exp",
    "Payload",
    "Expiration time — Unix timestamp after which the token is invalid",
  ],
  [
    "iat",
    "Payload",
    "Issued At — Unix timestamp of when the token was created",
  ],
  [
    "nbf",
    "Payload",
    "Not Before — Unix timestamp before which the token must not be accepted",
  ],
  ["jti", "Payload", "JWT ID — unique identifier to prevent token replay"],
];

export default function JwtDecoderPage() {
  return (
    <ToolPage
      id="jwt-decoder"
      heading="JWT Decoder."
      intro="Paste any JWT to see its decoded header, payload, expiry, and signature."
      extra={
        <>
          <ToolTable
            heading="Standard JWT claim reference."
            description="The registered claim names defined in the JWT specification (RFC 7519)."
            columns={["Claim", "Section", "Meaning"]}
            rows={CLAIM_REFERENCE}
            monoFirst
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Inspect a token's real contents — header, claims, and expiry — without pasting it into someone else's server."
      faqs={FAQS}
      faqTitle="JWT Decoder FAQ."
    >
      <JwtDecoder />
    </ToolPage>
  );
}
