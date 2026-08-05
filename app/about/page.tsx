import AboutPage from "@/components/pages/about/page";
import { HOST } from "@/data/constants";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { profilePageSchema } from "@/seo-utils/profilePageSchema";

const url = `${HOST}/about`;
const title = "About Mohd Sakib | Senior Full Stack & React Native Developer";
const description =
  "Mohd Sakib is a senior full-stack and React Native developer from Delhi, India. 8 production products, 25K+ users served, $100K+ processed — building web, mobile, and AI products for US, UK, and global teams.";

export const metadata = createMetaData({
  title,
  description,
  url,
  keywords: [
    "Mohd Sakib",
    "about Mohd Sakib",
    "Mohd Sakib developer",
    "senior full stack developer India",
    "React Native developer India",
    "hire full stack developer India",
    "AI developer India",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: profilePageSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadCrumbSchema(title, HOST, url),
        }}
      />

      <AboutPage />
    </>
  );
}
