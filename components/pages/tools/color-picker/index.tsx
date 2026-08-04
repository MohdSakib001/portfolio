import {
  Blend,
  Copy,
  Image,
  Palette,
  Pipette,
  ShieldCheck,
} from "lucide-react";

import ToolPage, { type ToolFeature } from "@/components/tools/ToolPage";
import ToolTable from "@/components/tools/ToolTable";
import ColorPicker from "./ColorPicker";
import { FAQS } from "./content";

const FEATURES: ToolFeature[] = [
  {
    title: "Four Formats",
    description: "HEX, RGB, HSL, and CMYK for the same colour, side by side.",
    icon: Palette,
  },
  {
    title: "Colour Harmonies",
    description:
      "Complementary, analogous, and triadic schemes generated for you.",
    icon: Pipette,
  },
  {
    title: "Palette Building",
    description: "Assemble and compare a set of colours before committing.",
    icon: Blend,
  },
  {
    title: "Extract From Image",
    description: "Pull dominant colours out of an uploaded image.",
    icon: Image,
  },
  {
    title: "One-Click Copy",
    description:
      "Copy any format straight into CSS, a design tool, or a token file.",
    icon: Copy,
  },
  {
    title: "Local Processing",
    description: "Images are read in the browser and never uploaded.",
    icon: ShieldCheck,
  },
];

const FORMAT_REFERENCE: (string | number)[][] = [
  [
    "HEX",
    "#3B82F6",
    "Hexadecimal is the most common color format on the web. It encodes red, green, and blue channels as pairs of hex digits (00–FF), giving 16,777,216 possible colors. Used directly in CSS, SVG, and design tools like Figma.",
  ],
  [
    "RGB",
    "rgb(59, 130, 246)",
    "RGB (Red, Green, Blue) expresses color as three integer values from 0 to 255. It maps directly to how screens emit light. CSS supports both rgb() and rgba() with an optional alpha channel for transparency.",
  ],
  [
    "HSL",
    "hsl(217, 91%, 60%)",
    "HSL (Hue, Saturation, Lightness) is the most human-friendly format. Hue is a degree on the color wheel (0–360°), saturation controls intensity (0–100%), and lightness controls brightness (0% is black, 100% is white). Ideal for programmatic palette generation.",
  ],
  [
    "CMYK",
    "cmyk(76%, 47%, 0%, 4%)",
    "CMYK (Cyan, Magenta, Yellow, Key/Black) is the standard for print. Unlike additive RGB, CMYK is subtractive — mixing inks absorbs light. Professional print workflows use CMYK values to match physical ink output on paper.",
  ],
];

export default function ColorPickerPage() {
  return (
    <ToolPage
      id="color-picker"
      heading="Color Picker & Palette."
      intro="Pick any colour to get HEX, RGB, HSL, and CMYK instantly — plus palettes, harmonies, and image extraction."
      extra={
        <>
          <ToolTable
            heading="Understanding colour formats."
            description="Each format is designed for a different purpose — screen rendering, design systems, or professional printing."
            columns={["Format", "Example", "Where it is used"]}
            rows={FORMAT_REFERENCE}
          />
        </>
      }
      features={FEATURES}
      featuresDescription="Every representation of one colour at once, plus the harmonies and extraction steps that usually need a design tool."
      faqs={FAQS}
      faqTitle="Color Picker & Palette FAQ."
    >
      <ColorPicker />
    </ToolPage>
  );
}
