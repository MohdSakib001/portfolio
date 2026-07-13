import ServicePageShell from "@/components/pages/services/ServicePageShell";
import { buildServiceMetadata } from "@/data/services";

const SLUG = "hire-saas-developer-india";

export const metadata = buildServiceMetadata(SLUG);

export default function HireSaasDeveloperIndiaPage() {
  return <ServicePageShell slug={SLUG} />;
}
