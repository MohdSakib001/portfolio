import {
  ArrowLeftRight,
  Database,
  Ruler,
  ShieldCheck,
  Thermometer,
  Zap,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import UnitConverter from "./UnitConverter";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Seven Categories",
    description:
      "Length, weight, temperature, volume, speed, area, and digital storage.",
    icon: ArrowLeftRight,
  },
  {
    title: "Exact Factors",
    description:
      "Conversions use precise ratios rather than rounded shortcuts.",
    icon: Ruler,
  },
  {
    title: "Temperature Handled",
    description:
      "Celsius, Fahrenheit, and Kelvin use real offsets, not naive scaling.",
    icon: Thermometer,
  },
  {
    title: "Data Sizes",
    description:
      "Convert between bytes, kilobytes, megabytes, gigabytes, and terabytes.",
    icon: Database,
  },
  {
    title: "Live Conversion",
    description: "Results update as you type in either direction.",
    icon: Zap,
  },
  {
    title: "Fully Offline",
    description: "Pure arithmetic in the browser — no lookup service involved.",
    icon: ShieldCheck,
  },
];

const QUICK_REFERENCE: (string | number)[][] = [
  ["1 mile", "1.609344 km", "Length"],
  ["1 foot", "30.48 cm", "Length"],
  ["1 kg", "2.20462 lbs", "Weight"],
  ["1 stone", "6.35029 kg", "Weight"],
  ["0°C", "32°F / 273.15 K", "Temperature"],
  ["100°C", "212°F / 373.15 K", "Temperature"],
  ["1 US gallon", "3.78541 L", "Volume"],
  ["1 GB", "1,024 MB", "Data"],
];

export default function UnitConverterPage() {
  return (
    <ToolPage
      id="unit-converter"
      heading="Unit Converter."
      intro="Length, weight, temperature, volume, speed, area, and data — seven categories, instant results."
      extra={
        <>
          <ToolTable
            heading="Quick reference."
            description="Conversions people look up most often, across all seven categories."
            columns={["From", "To", "Category"]}
            rows={QUICK_REFERENCE}
            monoFirst
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Seven categories of units behind one field, converted with exact factors rather than rounded approximations."
      faqs={FAQS}
      faqTitle="Unit Converter FAQ."
    >
      <UnitConverter />
    </ToolPage>
  );
}
