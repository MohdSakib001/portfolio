import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import ColorPicker from "@/components/pages/tools/color-picker";
import { FAQS } from "@/components/pages/tools/color-picker/content";

const url = `${HOST}/tools/color-picker`;
const title = "Free Color Picker — HEX, RGB, HSL, CMYK Color Tool Online";
const description =
  "Pick any color and instantly get HEX, RGB, HSL, and CMYK values. Generate shades, tints, complementary, analogous and triadic palettes. Extract dominant colors from images. 100% free, browser-based.";
const keywords = toolKeywords["color-picker"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function ColorPickerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageSchema(title, description, url),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: softwareApplicationSchema({
            name: "Color Picker & Palette",
            tagline: description,
            links: { live: url },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaFrom(FAQS) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadCrumbSchema("Color Picker & Palette", HOST, url),
        }}
      />
      <ColorPicker />
    </>
  );
}
