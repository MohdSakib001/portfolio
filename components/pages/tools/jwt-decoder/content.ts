import type { FaqItem } from "@/components/Faq";

/** Shared by the page's FAQPage JSON-LD and the rendered accordion. */
export const FAQS: FaqItem[] = [
  {
    question: "What is a JWT?",
    answer:
      "A JSON Web Token (JWT) is a compact, URL-safe token format defined in RFC 7519. It encodes claims (statements about an entity) as a JSON object that is signed — ensuring it hasn't been tampered with. JWTs are widely used for authentication and information exchange in web applications and APIs.",
  },
  {
    question: "What are the three parts of a JWT?",
    answer:
      "A JWT has three Base64URL-encoded parts separated by dots: 1) Header — contains the token type and signing algorithm. 2) Payload — contains the claims (user data, expiry, etc.). 3) Signature — the HMAC or RSA signature that verifies the token's integrity.",
  },
  {
    question: "Can you verify a JWT with this tool?",
    answer:
      "No. Verification requires the secret key (for HMAC algorithms) or the public key (for RSA/ECDSA). This tool only decodes the Base64URL-encoded parts to make them readable. Never share your signing secret with any online tool.",
  },
  {
    question: "Is it safe to paste my JWT here?",
    answer:
      "This tool runs entirely in your browser — no data is sent to any server, logged, or stored. That said, JWTs can contain sensitive user information. Use test/development tokens for online tools and keep production tokens in secure environments.",
  },
  {
    question: "What does 'exp' mean in a JWT payload?",
    answer:
      "exp is the expiration claim — a Unix timestamp (seconds since January 1, 1970 UTC) after which the token should be considered invalid. This tool converts the raw timestamp to a human-readable date and marks the token as expired if the current time is past the expiry.",
  },
  {
    question: "What is the difference between HS256 and RS256?",
    answer:
      "HS256 (HMAC-SHA256) uses a single shared secret for both signing and verification — suitable for internal services where you control both sides. RS256 (RSA-SHA256) uses a private key to sign and a public key to verify — better for distributed systems where the verifier shouldn't have the signing key.",
  },
];
