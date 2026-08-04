import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import CountdownTimer from "@/components/pages/tools/countdown-timer";
import { FAQS } from "@/components/pages/tools/countdown-timer/content";

const url = `${HOST}/tools/countdown-timer`;
const title = "Free Countdown Timer — Count Down to Any Date or Event";
const description =
  "Create a countdown to any event — a birthday, deadline, vacation, or new year. Displays days, hours, minutes, and seconds in real time. Free, browser-based, no sign-up.";
const keywords = toolKeywords["countdown-timer"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function CountdownTimerPage() {
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
            name: "Countdown Timer",
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
          __html: breadCrumbSchema("Countdown Timer", HOST, url),
        }}
      />
      <CountdownTimer />
    </>
  );
}
