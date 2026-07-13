import ServicePageShell from "@/components/pages/services/ServicePageShell";
import { buildServiceMetadata } from "@/data/services";

const SLUG = "hire-react-native-developer-india";

export const metadata = buildServiceMetadata(SLUG);

export default function HireReactNativeDeveloperIndiaPage() {
  return <ServicePageShell slug={SLUG} />;
}
