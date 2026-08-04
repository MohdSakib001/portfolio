import {
  Download,
  Palette,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Wifi,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import QrCodeGenerator from "./QrCodeGenerator";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Multiple Payloads",
    description: "URLs, plain text, WiFi credentials, and contact details.",
    icon: QrCode,
  },
  {
    title: "WiFi Sharing",
    description: "Encode SSID and password so guests join by scanning.",
    icon: Wifi,
  },
  {
    title: "Custom Colours",
    description: "Set foreground and background to match your brand.",
    icon: Palette,
  },
  {
    title: "Error Correction",
    description: "Choose the redundancy level so codes survive print and wear.",
    icon: ShieldAlert,
  },
  {
    title: "PNG Download",
    description: "Export at usable resolution with no watermark applied.",
    icon: Download,
  },
  {
    title: "No Redirect Service",
    description: "The code encodes your data directly and will never expire.",
    icon: ShieldCheck,
  },
];

const QR_TYPE_REFERENCE: (string | number)[][] = [
  [
    "URL QR Code",
    "Encode any web address. Scan to open a website instantly — no typing required. Ideal for business cards, flyers, and product packaging.",
  ],
  [
    "WiFi QR Code",
    "Let guests join your network by scanning a code. Encodes SSID, password, and security type in the standard WIFI: format recognised by all modern phones.",
  ],
  [
    "Text QR Code",
    "Encode any plain text message up to a few hundred characters. Useful for short notes, instructions, coupons, or hidden messages.",
  ],
  [
    "Email QR Code",
    "Generates a mailto: link that opens the default mail app pre-filled with recipient address, subject, and body — perfect for contact pages.",
  ],
];

export default function QrCodeGeneratorPage() {
  return (
    <ToolPage
      id="qr-code-generator"
      heading="QR Code Generator."
      intro="Generate QR codes for URLs, WiFi networks, text, and email — with custom colours and free PNG download."
      extra={
        <>
          <ToolTable
            heading="What you can encode."
            description="Each type writes a different payload format into the same QR symbol."
            columns={["Type", "What it encodes"]}
            rows={QR_TYPE_REFERENCE}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Real QR encoding in the browser — including WiFi and vCard payloads — with no watermark and no expiring redirect."
      faqs={FAQS}
      faqTitle="QR Code Generator FAQ."
    >
      <QrCodeGenerator />
    </ToolPage>
  );
}
