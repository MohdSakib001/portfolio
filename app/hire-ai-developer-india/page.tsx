import ServicePageShell from "@/components/pages/services/ServicePageShell";
import { buildServiceMetadata } from "@/data/services";

const SLUG = "hire-ai-developer-india";

export const metadata = buildServiceMetadata(SLUG);

export default function HireAiDeveloperIndiaPage() {
  return <ServicePageShell slug={SLUG} />;
}
