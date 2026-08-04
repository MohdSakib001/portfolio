import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { webPageSchema } from "@/seo-utils/webPageSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { softwareApplicationSchema } from "@/seo-utils/softwareApplicationSchema";
import { faqSchemaFrom } from "@/seo-utils/faqSchema";
import { HOST } from "@/data/constants";
import { toolKeywords } from "@/data/toolKeywords";
import PomodoroTimer from "@/components/pages/tools/pomodoro-timer";
import { FAQS } from "@/components/pages/tools/pomodoro-timer/content";

const url = `${HOST}/tools/pomodoro-timer`;
const title = "Free Pomodoro Timer — Focus Timer with Configurable Sessions";
const description =
  "A Pomodoro focus timer with 25-minute work sessions, 5-minute short breaks, and 15-minute long breaks every 4 sessions. Configurable, with a subtle sound cue. Free, browser-based.";
const keywords = toolKeywords["pomodoro-timer"];

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function PomodoroTimerPage() {
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
            name: "Pomodoro Timer",
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
          __html: breadCrumbSchema("Pomodoro Timer", HOST, url),
        }}
      />
      <PomodoroTimer />
    </>
  );
}
