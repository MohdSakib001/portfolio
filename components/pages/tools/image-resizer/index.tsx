import {
  Download,
  Images,
  LayoutTemplate,
  LockKeyhole,
  Maximize2,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import ImageResizer from "./ImageResizer";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Any Dimension",
    description: "Set an exact pixel width and height for the output.",
    icon: Maximize2,
  },
  {
    title: "Ratio Lock",
    description:
      "Keep proportions locked so resized images never look stretched.",
    icon: LockKeyhole,
  },
  {
    title: "Platform Presets",
    description:
      "Jump straight to the correct size for common social placements.",
    icon: LayoutTemplate,
  },
  {
    title: "Quality Preserved",
    description: "Canvas resampling keeps output sharp rather than blocky.",
    icon: Images,
  },
  {
    title: "Instant Download",
    description: "Save the result immediately with no processing queue.",
    icon: Download,
  },
  {
    title: "Never Uploaded",
    description: "Images are read and written locally — safe for client work.",
    icon: ShieldCheck,
  },
];

const PLATFORM_SIZES: (string | number)[][] = [
  ["Instagram post", "1080 × 1080 px", "1:1", "Square feed post"],
  ["Instagram story", "1080 × 1920 px", "9:16", "Vertical full-screen"],
  ["Instagram landscape", "1080 × 566 px", "1.91:1", "Landscape feed post"],
  ["Twitter/X post", "1200 × 675 px", "16:9", "In-feed image"],
  ["Twitter/X banner", "1500 × 500 px", "3:1", "Profile header"],
  ["LinkedIn cover", "1584 × 396 px", "4:1", "Company/personal page"],
  ["LinkedIn post", "1200 × 627 px", "1.91:1", "Shared link image"],
  ["YouTube thumbnail", "1280 × 720 px", "16:9", "Min 640 × 360 px"],
  ["YouTube banner", "2560 × 1440 px", "16:9", "Channel art"],
  ["Facebook cover", "820 × 312 px", "2.63:1", "Personal profile"],
  ["Facebook post", "1200 × 630 px", "1.91:1", "Shared image"],
  ["Pinterest pin", "1000 × 1500 px", "2:3", "Vertical pin"],
];

export default function ImageResizerPage() {
  return (
    <ToolPage
      id="image-resizer"
      heading="Image Resizer."
      intro="Resize images to any dimension or social media preset — no upload, no account, nothing leaves your device."
      extra={
        <>
          <ToolTable
            heading="Social media size guide."
            description="Current recommended dimensions for the placements people resize for most."
            columns={["Platform", "Size", "Ratio", "Notes"]}
            rows={PLATFORM_SIZES}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Exact dimensions or a known-good preset, resized on-device with the aspect ratio kept honest."
      faqs={FAQS}
      faqTitle="Image Resizer FAQ."
    >
      <ImageResizer />
    </ToolPage>
  );
}
