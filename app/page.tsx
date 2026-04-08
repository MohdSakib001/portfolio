import { breadCrumbSchema } from '@/seo-utils/breadCrumbSchema';
import { siteNavigationElement } from '@/seo-utils/siteNavigationElement';
import { webPageSchema } from '@/seo-utils/webPageSchema';
import { createMetaData } from '@/seo-utils/CommonMeta';
import { personSchema } from '@/seo-utils/personSchema';
import { faqSchema } from '@/seo-utils/faqSchema';
import ClientLoaderWrapper from './components/ClientLoaderWrapper';
import Home from './pages/home';
import { HOST } from './data/constants';
import { homeKeyword } from './data/keywords';

const url = `https://mohdsakib.vercel.app`;
const title = `Krapton: Software Development Company`;
const description = `Krapton is a leading provider of cutting-edge web development, software development and digital services. With years of experience, we specialize in transforming your innovative ideas into scalable and dynamic digital products.`;
const keywords = homeKeyword;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function () {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema(title, description, url) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personSchema() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteNavigationElement() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadCrumbSchema(title, HOST, url) }} />
      <ClientLoaderWrapper />
      <Home />
    </>
  );
}
