import {
  Download,
  FileCheck2,
  Images,
  Minimize2,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ImageCompressor from "./ImageCompressor";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "60–85% Smaller",
    description:
      "Lossy re-encoding strips imperceptible detail while keeping images visually intact.",
    icon: Minimize2,
  },
  {
    title: "Quality Control",
    description:
      "Set the exact quality level and see the resulting file size before you download.",
    icon: SlidersHorizontal,
  },
  {
    title: "Batch Friendly",
    description: "Drop in multiple images and compress them in one pass.",
    icon: Images,
  },
  {
    title: "Format Support",
    description:
      "Handles JPG, PNG, WebP, and GIF using the browser's native encoders.",
    icon: FileCheck2,
  },
  {
    title: "No Watermarks",
    description:
      "No caps on file size, no sign-up wall, and nothing stamped onto your output.",
    icon: Download,
  },
  {
    title: "Never Uploaded",
    description:
      "Everything runs on-device, so proprietary and personal images stay private.",
    icon: ShieldCheck,
  },
];

export default function ImageCompressorPage() {
  return (
    <ToolPage
      id="image-compressor"
      heading="Image Compressor."
      intro="Compress JPG, PNG, WebP, and GIF images instantly — no upload, no server, entirely in your browser."
      explainer={{
        heading: "How image compression works.",
        paragraphs: [
          "This tool uses the browser's built-in Canvas API to redraw each image onto an off-screen canvas and then export it at the quality level you specify via canvas.toBlob(). Lossy formats like JPEG and WebP discard imperceptible detail to achieve dramatic file size reductions — often 60–85% smaller — while PNG uses lossless compression that preserves every pixel.",
          "Because all processing runs client-side in your browser's JavaScript engine, your images are never transmitted to any external server. This makes the tool safe for confidential, personal, or proprietary images. There are no file-size caps, no sign-up requirements, and no watermarks.",
        ],
      }}
      features={FEATURES}
      featuresDescription="Canvas-based compression that never uploads a byte — safe for confidential, personal, and client work."
      faqs={FAQS}
      faqTitle="Image Compressor FAQ."
    >
      <ImageCompressor />
    </ToolPage>
  );
}
